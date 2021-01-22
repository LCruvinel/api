module.exports = (sequelize, type) =>
  sequelize.define('userbooks', {
    userid: {
      type: type.INTEGER,
      primaryKey: true,
    },
    bookid: {
        type: type.INTEGER,
        primaryKey: true,
      },
     });