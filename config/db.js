const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('passport-auth-appdb', 'postgres', '****', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
