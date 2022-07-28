require('dotenv').config()

exports.config = {
  DB: {
    url : process.env.DATABASE_URL
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
  expressSession: {
    secret: process.env.SECRET_EXPRESS_SESSION || 'sessionsecret',
  },
  authGoogle: {
    clientID: process.env.ID_GOOGLE,
    clientSecret: process.env.SECRET_GOOGLE,
    callbackURL: process.env.CALLBACK_GOOGLE
  },
  authFacebook: {
    clientID: process.env.ID_FACEBOOK,
    clientSecret: process.env.SECRET_FACEBOOK,
    callbackURL: process.env.CALLBACK_FACEBOOK
  },
  authLinkedin: {
    clientID: process.env.ID_LINKEDIN,
    clientSecret: process.env.SECRET_LINKEDIN,
    callbackURL: process.env.CALLBACK_LINKEDIN
  },
  authGitHub: {
    clientID: process.env.ID_GITHUB,
    clientSecret: process.env.SECRET_GITHUB,
    callbackURL: process.env.CALLBACK_GITHUB
  },
  paypal:{
    clientID: process.env.ID_PAYPAL,
    secret: process.env.SECRET_PAYPAL,
  },
  mercadoPago:{
    token: process.env.TOKEN_MERCADOPAGO,
  }
}
