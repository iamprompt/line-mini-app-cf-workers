'use client'

import { ReactNode } from 'react'

import { liffContext, useLIFFContextValue } from './context'

type Props = {
  children: ReactNode
  liffId?: string
}

export const LIFFProvider = ({ children, liffId }: Props) => {
  const value = useLIFFContextValue({ liffId })

  return value.isReady ? (
    <liffContext.Provider value={value}>{children}</liffContext.Provider>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg text-gray-500">Loading LIFF...</p>
    </div>
  )
}
