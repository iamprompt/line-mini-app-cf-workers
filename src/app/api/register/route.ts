import { eq } from 'drizzle-orm'
import { flattenError } from 'zod'

import { getDatabase } from '@/lib/db'
import { registrations } from '@/lib/db/schema/registrations'
import { serviceMessages } from '@/lib/db/schema/serviceMessages'
import { issueStatelessChannelAccessToken } from '@/lib/line/accessToken'
import { getUserProfile, verifyAccessToken } from '@/lib/line/login'
import {
  issueServiceNotificationToken,
  sendServiceMessage,
} from '@/lib/line/mini'

import { RegisterBodySchema } from './schema'

export const POST = async (request: Request) => {
  const { json, headers } = request

  const accessToken = headers.get('Authorization')?.replace('Bearer ', '')
  if (!accessToken) {
    return Response.json(
      { error: 'Authorization header is missing or invalid' },
      { status: 401 },
    )
  }

  const body = RegisterBodySchema.safeParse(await json())
  if (!body.success) {
    return Response.json({ error: flattenError(body.error) }, { status: 400 })
  }

  const { data } = body

  await verifyAccessToken(accessToken)

  const profile = await getUserProfile(accessToken)

  const db = await getDatabase()

  // Uncomment the following lines if you want to check for existing registrations
  // const existingRegistration = await db
  //   .select()
  //   .from(registrations)
  //   .where(eq(registrations.lineUserId, profile.userId))

  // if (existingRegistration.length > 0) {
  //   return Response.json({ error: 'User already registered' }, { status: 409 })
  // }

  const [newRegistration] = await db
    .insert(registrations)
    .values({
      lineUserId: profile.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    })
    .returning()

  if (!newRegistration) {
    return Response.json({ error: 'Failed to register user' }, { status: 500 })
  }

  // Issue stateless channel access token
  const statelessToken = await issueStatelessChannelAccessToken()

  // Issue service notification token
  const serviceNotificationTokenResponse = await issueServiceNotificationToken(
    statelessToken,
    accessToken,
  )

  if (!serviceNotificationTokenResponse) {
    return Response.json(
      { error: 'Failed to issue service notification token' },
      { status: 500 },
    )
  }

  const [serviceMessageRecord] = await db
    .insert(serviceMessages)
    .values({
      registrationId: newRegistration.id,
      remainingCount: serviceNotificationTokenResponse.remainingCount,
      sessionId: serviceNotificationTokenResponse.sessionId,
      expiresAt: new Date(
        Date.now() + serviceNotificationTokenResponse.expiresIn * 1000,
      ),
      notificationToken: serviceNotificationTokenResponse.notificationToken,
    })
    .returning()

  if (!serviceMessageRecord || !serviceMessageRecord.notificationToken) {
    return Response.json(
      { error: 'Failed to create service message record' },
      { status: 500 },
    )
  }

  // Add function to send service message
  const sentServiceMessage = await sendServiceMessage(
    statelessToken,
    serviceNotificationTokenResponse.notificationToken,
    'join_d_m_th',
    {
      btn1_url: 'https://line.me',
      entry_date: '31/03/2033 0:00 น.',
    },
  )

  await db
    .update(serviceMessages)
    .set({
      remainingCount: sentServiceMessage.remainingCount,
      notificationToken: sentServiceMessage.notificationToken,
    })
    .where(eq(serviceMessages.sessionId, serviceMessageRecord.sessionId))

  return Response.json({
    message: 'User registered successfully',
  })
}
