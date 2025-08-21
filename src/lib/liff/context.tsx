import liff from '@line/liff'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { Profile } from './types'

type LIFFContextType = {
  liffId?: string
  isReady: boolean
  isLoggedIn: boolean
  profile: Profile | null
  isError: boolean
}

const DefaultContext: LIFFContextType = {
  liffId: undefined,
  isReady: false,
  isLoggedIn: false,
  profile: null,
  isError: false,
}

export const liffContext = createContext<LIFFContextType>(DefaultContext)

type UseLIFFContextValueOptions = {
  liffId?: string
}

export const useLIFFContextValue = ({
  liffId,
}: UseLIFFContextValueOptions): LIFFContextType => {
  const [isReady, setIsReady] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  const initializeLIFF = useCallback(async () => {
    if (!liffId) {
      console.warn('LIFF ID is not provided. Cannot initialize LIFF.')
      return
    }

    try {
      await liff.init({ liffId })
      setIsReady(true)
    } catch (error) {
      setIsReady(false)
      setIsError(true)
      console.error('LIFF initialization failed:', error)
      return
    }

    const isLoggedIn = liff.isLoggedIn()
    setIsLoggedIn(isLoggedIn)

    if (isLoggedIn) {
      try {
        const profile = await liff.getProfile()
        setProfile(profile)
      } catch (error) {
        console.error('Failed to get LIFF profile:', error)
      }
    }
  }, [liffId])

  useEffect(() => {
    if (!liffId) {
      console.warn(
        'LIFF ID is not provided. LIFF context will not be initialized.',
      )
      return
    }

    initializeLIFF()
  }, [liffId, initializeLIFF])

  return {
    liffId,
    isReady,
    isLoggedIn,
    profile,
    isError,
  }
}

export const useLIFF = () => {
  const context = useContext(liffContext)
  if (!context) {
    throw new Error('useLIFF must be used within a LIFFProvider')
  }
  return context
}
