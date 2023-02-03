const dotenv = require('dotenv');
dotenv.config();
const minimist = require ('minimist')


const args = minimist(process.argv.slice(2),{
  alias:{
    p: 'port',
    m: 'mode'
  },
  default:{
    mode: 'FORK'
  }
})

module.exports = {
  MODE: args.mode,
  PORT: args.port,
  DB_PASSWORD: process.env.DB_PASSWORD,

  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_EMAIL_PASSWORD: process.env.ADMIN_EMAIL_PASSWORD,

  ADMIN_WHATSAPP: process.env.ADMIN_WHATSAPP,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP,
}