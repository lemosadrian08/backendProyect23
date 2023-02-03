const twilio = require('twilio')
const envConfig = require('./config.utils')


const twilioClient = twilio(envConfig.TWILIO_ACCOUNT_SID, envConfig.TWILIO_AUTH_TOKEN)

const sendWhatsapp = async (messageWhatsapp) => {
  const response = await twilioClient.messages.create(messageWhatsapp)
}

module.exports = sendWhatsapp

