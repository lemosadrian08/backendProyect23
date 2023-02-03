const app = require("./app");
const envConfig = require("./utils/config.utils");
const MongoContainer= require('./models/containers/mongo.container')
const logger = require('./utils/logger.utils')
const config = require('./utils/config.utils')
const cluster = require('cluster')
const os = require('os')
const PORT = config.PORT || 8080;


if (config.MODE == 'CLUSTER' && cluster.isPrimary){
  logger.log('info', `CLUSTER - PDI: ${process.pid}`);
  const cpus = os.cpus().length
  for(let i=0; i< cpus; i++){
    cluster.fork()
  }
}else{
  logger.log('info', `FORK - PDI: ${process.pid}`);


const server = app.listen(PORT, () => {
  MongoContainer.connect().then(() => {
    logger.log('info', `Server is up and running on port ${PORT}`)
    logger.log('info', 'Connected to MongoDb')
  })
})

server.on('error', (error) => {
  logger.log('error', 'Error: ', error);
})

}