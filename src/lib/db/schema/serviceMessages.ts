import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { registrations } from './registrations'

export const serviceMessages = sqliteTable('service_messages', {
  id: integer('id').primaryKey(),
  registrationId: integer('registration_id')
    .references(() => registrations.id)
    .notNull(),
  notificationToken: text('notification_token'),
  remainingCount: integer('remaining_count').notNull(),
  sessionId: text('session_id').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(
    sql`(unixepoch() * 1000)`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdateFn(() => new Date()),
})
