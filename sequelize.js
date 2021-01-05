const Sequelize = require('sequelize');
const UserModel = require('./models/utentes');

const sequelize = new Sequelize('users', 'webdev', 'DevWeb01', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log('Criou a BD users e a tabela utentes (se não existisse anteriormente) ');
});

module.exports = User;