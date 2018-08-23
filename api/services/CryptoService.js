const crypto = require('crypto');

module.exports = {
  encryptPassword: (password) => {
    return crypto.createHash('sha1').update(password).digest('hex');
  },

  generateTokenFromJSON: (input) => {
    const quaziRandomString = JSON.stringify(input) + new Date();
    return crypto.createHash('sha1').update(quaziRandomString).digest('hex');
  }
};