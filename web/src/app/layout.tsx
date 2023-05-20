import { cookies } from 'next/headers'
import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamjuree } from 'next/font/google'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Hero } from '@/components/Hero'
import { Copyright } from '@/components/Copyright'
import { EmptyMemories } from '@/components/EmptyMemories'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jamjuree' })

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isAuthenticated = cookies().has('token')


  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-gray-900 text-gray-100`}>

        <main className='grid min-h-screen grid-cols-2'>
          {/*Left*/}
          <div className='relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover'>
            {/*Blur*/}
            <div className='absolute right-0 top-1/2 h-[288px] -translate-y-1/2 translate-x-1/2 rounded-full w-[526px] bg-purple-700 blur-full' />
            {/*Stripes*/}
            <div className='absolute right-2 top-0 bottom-0 w-2 bg-stripes' />
            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>
          <div className='flex flex-col max-h-screen overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover'>
            {children}
          </div>
        </main >

      </body>
    </html>
  )
}
