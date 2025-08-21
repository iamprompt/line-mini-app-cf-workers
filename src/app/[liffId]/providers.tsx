'use client'

import { ReactNode } from 'react'

import { LIFFProvider } from '@/lib/liff/LIFFProvider'

type Props = {
  children: ReactNode
  liffId?: string
}

export const LIFFProviders = ({ children, liffId }: Props) => {
  return <LIFFProvider liffId={liffId}>{children}</LIFFProvider>
}
