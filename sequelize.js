const Sequelize = require("sequelize");
const UserModel = require("./models/utentes");

const bcrypt = require("bcrypt"),
  BCRYPT_SALT_ROUNDS = 12;

const sequelize = new Sequelize("users", "webdev", "DevWeb01", {
  host: "localhost",
  dialect: "mysql",
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log(
    "Criou na BD users a tabela utentes (se não existisse anteriormente)"
  );
  /*  
  // Na primeira execução cria a conta do administrador
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
});
module.exports = User;
