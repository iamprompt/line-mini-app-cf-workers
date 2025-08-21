'use client'

import liff from '@line/liff'

import { useLIFF } from '@/lib/liff/context'

const Page = () => {
  const { isReady, profile } = useLIFF()

  return (
    <>
      <pre>{JSON.stringify(isReady)}</pre>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      {isReady && <pre>{JSON.stringify(liff.getAccessToken())}</pre>}
    </>
  )
}

export default Page
