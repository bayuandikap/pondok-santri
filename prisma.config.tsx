import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    // Used for schema management & structural migrations
    url: process.env.DIRECT_URL, 
  },
})