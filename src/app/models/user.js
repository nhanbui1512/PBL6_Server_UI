const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  Email: { type: String, default: '' },
  UserName: { type: String, default: '' },
  Address: { type: String, default: '' },
  PhoneNumber: { type: String, default: '' },
  Password: { type: String, default: '' },
  Permission: { type: Number },
});

module.exports = mongoose.model('user', user);
