const envConfig = require('../utils/config.utils');


module.exports = {
  mongodb: {
    uri: `mongodb+srv://lemosadrian08:${envConfig.DB_PASSWORD}@cluster0.gs1l0ic.mongodb.net/Users?retryWrites=true&w=majority`
  }
}