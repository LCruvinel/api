module.exports = (sequelize, type) =>
  sequelize.define('bookData', {
    Id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    AuthorName: type.STRING,
    BookTitle: type.STRING,
    BookPhoto: type.STRING,
    AuthorPhoto: type.STRING,
   });