/* PARA DAR A TIPAGEM A PROPRIEDADE SUB QUE VEM NAS INFORMACOES DO USUARIO QUANDO FORNECEMOS O TOKEN.
JUNTAMENTE COM O USO DO FASTIFY E O TYPESCRIPT.
*/

import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
  }
}