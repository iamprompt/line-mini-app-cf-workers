import { lineInstance } from './http'
import {
  LoginGetFriendshipStatusResponseSchema,
  LoginGetUserInformationResponseSchema,
  LoginGetUserProfileResponseSchema,
  VerifyAccessTokenResponseSchema,
} from './schema'

export const getUserProfile = async (accessToken: string) => {
  const response = await lineInstance.get('v2/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = LoginGetUserProfileResponseSchema.parse(await response.json())

  return data
}

export const verifyAccessToken = async (
  accessToken: string = '',
  expectedClientId?: string,
) => {
  if (!accessToken) {
    return false
  }

  const response = await lineInstance.get<{
    scope: string
    client_id: string
    expires_in: number
  }>('oauth2/v2.1/verify', {
    searchParams: {
      access_token: accessToken,
    },
  })

  const data = VerifyAccessTokenResponseSchema.parse(await response.json())

  if (data.expires_in <= 0) {
    return false
  }

  if (expectedClientId && data.client_id !== expectedClientId) {
    return false
  }

  return true
}

export const getFriendshipStatus = async (accessToken: string) => {
  const response = await lineInstance.get('friendship/v1/status', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = LoginGetFriendshipStatusResponseSchema.parse(
    await response.json(),
  )

  return data.friendFlag
}

export const getUserInformation = async (accessToken: string) => {
  const response = await lineInstance.get('oauth2/v2.1/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = LoginGetUserInformationResponseSchema.parse(
    await response.json(),
  )

  return data
}
