import { ReactNode } from 'react'

import { LIFFProviders } from './providers'

type Props = Readonly<{
  children: ReactNode
  params: Promise<{ liffId: string }>
}>

const LIFFLayout = async ({ children, params }: Props) => {
  const { liffId } = await params
  return <LIFFProviders liffId={liffId}>{children}</LIFFProviders>
}

export default LIFFLayout
