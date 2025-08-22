import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { fonts } from '@/styles/fonts'

import { LIFFProviders } from './providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'LINE MINI App Demo',
  description: 'A demo app for LINE MINI App',
}

type Props = Readonly<{
  children: ReactNode
}>

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="th" className={cn(fonts)}>
      <body className={cn('antialiased')}>
        <LIFFProviders liffId={process.env.NEXT_PUBLIC_MINI_LIFF_ID}>
          {children}
        </LIFFProviders>
      </body>
    </html>
  )
}

export default RootLayout
