const Sequelize = require('sequelize');
const UserModel = require('./models/user');

const sequelize = new Sequelize('users', 'webdev', 'DevWeb01', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log('Criou a BD users e a tabela user');
});

module.exports = User;