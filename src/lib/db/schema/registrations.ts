import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const registrations = sqliteTable('registrations', {
  id: integer('id').primaryKey(),
  lineUserId: text('line_user_id', { length: 33 }).notNull(),
  firstName: text('first_name', { length: 255 }).notNull(),
  lastName: text('last_name', { length: 255 }).notNull(),
  email: text('email', { length: 255 }).notNull(),
  phone: text('phone', { length: 15 }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(
    sql`(unixepoch() * 1000)`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdateFn(() => new Date()),
})
