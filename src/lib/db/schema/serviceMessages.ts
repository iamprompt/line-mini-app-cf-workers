import { sql } from 'drizzle-orm'
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

import { registrations } from './registrations'

export const serviceMessages = sqliteTable('service_messages', {
  id: integer('id').primaryKey(),
  registrationId: integer('registration_id')
    .references(() => registrations.id)
    .notNull(),
  notificationToken: integer('notification_token').notNull(),
  remainingCount: integer('remaining_count').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(
    sql`(unixepoch() * 1000)`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdateFn(() => new Date()),
})
