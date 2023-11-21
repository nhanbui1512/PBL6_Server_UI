const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { PERMISSIONS } = require('../constants');

const user = new Schema({
  Email: { type: String, default: '' },
  UserName: { type: String, default: '' },
  Address: { type: String, default: '' },
  PhoneNumber: { type: String, default: '' },
  Password: { type: String, default: '' },
  Permission: { type: Object, default: PERMISSIONS[0] },
});

module.exports = mongoose.model('user', user);
