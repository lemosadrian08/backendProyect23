const twilio = require('twilio')
const envConfig = require('./config.utils')


const twilioClient = twilio(envConfig.TWILIO_ACCOUNT_SID, envConfig.TWILIO_AUTH_TOKEN)

const sendSMS = async (messageSMS) => {
  await twilioClient.messages.create(messageSMS)
}

module.exports = sendSMS