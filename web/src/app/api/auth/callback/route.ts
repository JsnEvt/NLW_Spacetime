import { api } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  /* A LINHA ABAIXO, OBTEM O CODIGO DO GITHUB ATRAVES DOS PARAMETROS DA ROTA.*/
  const code = searchParams.get('code')

  /* AQUI CONSIGO PEGAR O REDIRECTTO DA ROTA DE MIDDLEWARE */
  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', { code })
  const { token } = registerResponse.data

  /*PARA GUARDAR O TOKEN, USA-SE UM RECURSO ANTIGO CHAMADO COOKIES, PARA POSTERIOR 
  ARMAZENAMENTO DO BANCO DE DADOS.*/

  /*REDIRECIONANDO*/

  /* EXISTINDO A INFORMACAO DO REDIRECTTO MANDA PARA A PAGINA, CASO NEGATIVO, MANDA PARA A HOME*/

  const redirectURL = redirectTo ?? new URL('/memories/new', request.url)

  const cookiesExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookiesExpiresInSeconds};`,
    }
  })
}