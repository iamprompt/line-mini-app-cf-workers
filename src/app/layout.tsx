import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { fonts } from '@/styles/fonts'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'TicketO Demo',
  description: 'A demo app for TicketO',
}

type Props = Readonly<{
  children: ReactNode
}>

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="th" className={cn(fonts)}>
      <body className={cn('antialiased')}>{children}</body>
    </html>
  )
}

export default RootLayout
