import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

export function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated')
  }
  /*DECODE PARA EXTRAIR OS DADOS DO USUARIO PARA ENVIAR PARA O PREENCHIMENTO DAS INFORMACOES
  DO MESMO NO FRONTEND.*/
  const user: User = decode(token)
  return user
}