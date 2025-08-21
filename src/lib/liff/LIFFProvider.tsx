'use client'

import { ReactNode } from 'react'

import { liffContext, useLIFFContextValue } from './context'

type Props = {
  children: ReactNode
  liffId?: string
}

export const LIFFProvider = ({ children, liffId }: Props) => {
  const value = useLIFFContextValue({ liffId })

  return <liffContext.Provider value={value}>{children}</liffContext.Provider>
}
