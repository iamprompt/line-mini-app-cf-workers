import { HTTPError } from 'ky'

import { lineInstance } from './http'
import { IssueStatelessChannelAccessTokenResponseSchema } from './schema'

export const issueStatelessChannelAccessToken = async (
  channelId: string = process.env.NEXT_PUBLIC_MINI_CHANNEL_ID,
  channelSecret: string = process.env.MINI_CHANNEL_SECRET,
) => {
  const searchParams = new URLSearchParams()
  searchParams.set('grant_type', 'client_credentials')
  searchParams.set('client_id', channelId)
  searchParams.set('client_secret', channelSecret)

  try {
    const response = await lineInstance.post('oauth2/v3/token', {
      body: searchParams,
    })

    const data = IssueStatelessChannelAccessTokenResponseSchema.parse(
      await response.json(),
    )

    return data.access_token
  } catch (error) {
    console.error('Error issuing stateless channel access token:', error)
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json()
      console.error(
        'Error issuing stateless channel access token:',
        errorResponse,
      )
    }
    throw error
  }
}
