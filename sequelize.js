const Sequelize = require("sequelize");
const UserModel = require("./models/utentes");
const BookModel = require("./models/bookData");
const Favoritos = require("./models/favoritos");

const db = {};
db[0] = new Sequelize("users", "webdev", "DevWeb01", {
  host: "localhost",
  dialect: "mysql",
});
db[1] = new Sequelize("library", "webdev", "DevWeb01", {
  host: "localhost",
  dialect: "mysql",
});

const tables = {};
tables[0] = UserModel(db[0], Sequelize);
tables[1] = BookModel(db[1], Sequelize);
tables[2] = Favoritos(db[0], Sequelize);

/*
// Fazer o sync() para criar a tabela se não existir
db[0].sync().then(() => {
  console.log(
    "Criou na BD users a tabela utentes (se não existisse anteriormente)"
  );
});
*/
/*  
  // Na primeira execução pode criar a conta do administrador
  const bcrypt = require("bcrypt"),
  BCRYPT_SALT_ROUNDS = 12;

bcrypt.hash("123", BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
    User.create({
      first_name: "Admin",
      last_name: "admin",
      email: "lc@xpto.pt",
      username: "admin",
      password: hashedPassword,
    }).then((user) => {
      console.log("Utilizador adicionado!");
    });
  });
  */
module.exports = tables;