import { getCloudflareContext } from '@opennextjs/cloudflare'
import { drizzle } from 'drizzle-orm/d1'

let db: ReturnType<typeof drizzle>

export const getDatabase = async () => {
  if (!db) {
    const context = await getCloudflareContext({ async: true })
    db = drizzle(context.env.DB)
  }

  return db
}
