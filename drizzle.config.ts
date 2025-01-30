import type { Config } from 'drizzle-kit'

export default {
  dialect: 'sqlite',
  schema: './src/shared/schema/app-schema.ts',
  out: './migrations',
  dbCredentials: {
    url: 'file:temp/app.db'
  }
} satisfies Config