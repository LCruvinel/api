const tables = require("../sequelize");
const Books = tables[1];

module.exports = (app) => {
  app.get("/allbooks", (req, res, next) => {
        Books.findAll()
        .then((books) => {
            res.status(200).send(JSON.stringify(books,null, 2));
        });
      });
};
