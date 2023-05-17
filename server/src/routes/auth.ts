import { FastifyInstance } from 'fastify';
import axios from 'axios'
import { z } from 'zod';
import { prisma } from '../lib/prisma';

/*A ROTA ABAIXO E USADA COM A CHAVE ENVIADA PELO GITHUB NA OCASIAO DA CRIACAO DA CONTA
NA PLATAFORMA DO SPACETIME PARA GERAR O ACCESS_TOKEN VALIDANDO E IDENTIFICANDO O USUARIO,
COM ELA, PODEMOS TER ACESSO AOS DADOS DO USUARIO NO GITHUB E CADASTRAR NO NOSSO BANCO DE DADOS.*/

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })
    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post('https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json'
        }
      })
    const { access_token } = accessTokenResponse.data
    /*OBTENDO OS DADOS DO USUARIO QUE FEZ LOGIN NO GIT USANDO O ACCESS TOKEN GERADO PELO GIT 
    E DEVOLVIDO A NOS PARA ACESSAR ESSAS INFORMACOES DO USUARIO. */

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    /* VERIFICANDO SE O USUARIO EXISTE: */
    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url
        }
      })
    }

    /* AQUI SERA GERADO O TOKEN PELO JWT DEVIDO A EXPIRACAO DO ACCESS TOKEN GERADO PELO GIT,
    PERMITINDO QUE O USUARIO POSSA CONTINUAR NA APLICACAO E O BACKEND SABER QUEM 
    SOLICITA AS REQUISICOES, EIS A IMPORTANCIA DO JWT TOKEN*/

    const token = app.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl
    }, {
      sub: user.id,
      expiresIn: '30 dias'
    })

    return {
      token,
    }
  })
}