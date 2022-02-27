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
  },
  redis:{
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  authGoogle:{
    clientID: process.env.ID_GOOGLE,
    clientSecret: process.env.SECRET_GOOGLE,
    callbackURL: process.env.CALLBACK_GOOGLE
  },
  authFacebook:{
    clientID: process.env.ID_FACEBOOK,
    clientSecret: process.env.SECRET_FACEBOOK,
    callbackURL: process.env.CALLBACK_FACEBOOK
  },
  authLinkedin:{
    clientID: process.env.ID_LINKEDIN,
    clientSecret: process.env.SECRET_LINKEDIN,
    callbackURL: process.env.CALLBACK_LINKEDIN
  }

}