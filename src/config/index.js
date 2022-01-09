require('dotenv').config()

exports.config = {
  DB: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'delilah_resto'
  },
  server: {
    port: process.env.NODE_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwtpass'
  }
}
