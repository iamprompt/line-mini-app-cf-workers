import z from 'zod'

// LINE Login Schemas
export const VerifyAccessTokenResponseSchema = z.object({
  client_id: z.string(),
  expires_in: z.number().int(),
  scope: z.string(),
})

export const LoginGetUserProfileResponseSchema = z.object({
  userId: z.string().length(33),
  displayName: z.string(),
  pictureUrl: z.url().optional(),
  statusMessage: z.string().optional(),
})

export const LoginGetFriendshipStatusResponseSchema = z.object({
  friendFlag: z.boolean(),
})

export const LoginGetUserInformationResponseSchema = z.object({
  sub: z.string(),
  name: z.string(),
  picture: z.url().optional(),
})

// LINE MINI App Schemas
export const IssueServiceNotificationTokenResponseSchema = z.object({
  notificationToken: z.string(),
  expiresIn: z.number().int(),
  remainingCount: z.number().int(),
  sessionId: z.string(),
})

// Channel Access Token Schemas
export const IssueStatelessChannelAccessTokenResponseSchema = z.object({
  token_type: z.string(),
  access_token: z.string(),
  expires_in: z.number().int(),
})
