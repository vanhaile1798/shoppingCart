let mongoose = require('mongoose');

let userSchema = require('../schemas/users');

let user = mongoose.model('User', userSchema);

module.exports = user;