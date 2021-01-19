const passport = require("passport");
const tables = require("../sequelize");
const Books = tables[1];

module.exports = (app) => {
  app.get("/allbooks", (req, res, next) => {
        Books.findAll()
        .then((books) => {
            console.log("Todos livros: ",JSON.stringify(books,null, 2));
            res.status(200).send(JSON.stringify(books,null, 2));
        });
      });
};
