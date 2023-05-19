import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      /*Zerando os cookies e saindo da aplicação*/
      'Set-Cookie': `token=; Path=/; max-age=0;`,
    }
  })
}