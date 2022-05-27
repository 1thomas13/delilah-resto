require('dotenv').config()

exports.config = {
  DB: {
    host: process.env.DB_HOST || "delilah-rds.c4u76wafbtm9.us-east-2.rds.amazonaws.com" ,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || 'SantiYthomi10',
    database: process.env.DB_NAME || 'delilahresto'
  },
  server: {
    port: process.env.NODE_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwtpass'
  },
  redis:{
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }

}
