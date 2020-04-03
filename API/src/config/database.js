const { db } = require('../.env');

module.exports = {
  ...db,
  dialect: 'mysql',
}