import { lineInstance } from './http'
import { IssueServiceNotificationTokenResponseSchema } from './schema'

export const issueServiceNotificationToken = async (
  accessToken: string,
  liffAccessToken: string,
) => {
  const response = await lineInstance.post('message/v3/notifier/token', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: {
      liffAccessToken,
    },
  })

  const data = IssueServiceNotificationTokenResponseSchema.parse(
    await response.json(),
  )

  return data
}

export const sendServiceMessage = async (
  accessToken: string,
  notificationToken: string,
  templateName: string,
  params: Record<string, string>,
) => {
  const response = await lineInstance.post('message/v3/notifier/send', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    searchParams: {
      target: 'service',
    },
    json: {
      templateName,
      params,
      notificationToken,
    },
  })

  const data = IssueServiceNotificationTokenResponseSchema.parse(
    await response.json(),
  )

  return data
}
