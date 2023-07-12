const config = require('./utils/config');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connect = () => {
  return mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB');
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message);
    });
};

const close_connection = async () => {
  await mongoose.connection.close();
};

module.exports = { connect, close_connection };
