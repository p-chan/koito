const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: process.env.DB_CHARSET,
  timezone: process.env.DB_TIMEZONE,
  entities: ['./src/db/entities/*.ts'],
  migrations: ['./src/db/migrations/*.ts'],
  cli: {
    entitiesDir: './src/db/entities',
    migrationsDir: './src/db/migrations'
  }
}
