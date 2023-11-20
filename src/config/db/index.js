const mongoose = require('mongoose');

async function connect() {
  const dbName = 'your_database_name';

  mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {});

  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;

  // Get the default connection
  const db = mongoose.connection;

  // Bind connection to error event (to get notifications of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
}
module.exports = connect;
