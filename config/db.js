const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('passport-auth-appdb', 'postgres', '2023', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
