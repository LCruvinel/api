const tables = require("../sequelize");
const jwtSecret = require("../config/jwtConfig");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = tables[0];

module.exports = (app) => {
  app.post("/loginUser", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(200).send({
          auth: false,
          message: `${info.message}`,
        }); // envia ao cliente a indicação da falha de autenticação
      } else {
        req.logIn(user, (err) => {
          // este método é necessário para as callback funcionarem
          User.findOne({
            where: {
              username: user.username,
            },
          }).then((user) => {
            const token = jwt.sign({ id: user.username }, jwtSecret.secret, {
              expiresIn: 300, // expires in 5 min
            });
            res.status(200).send({
              auth: true,
              admin: user.username == 'admin',
              token: token,
              message: "Utilizador encontrado e autenticado!",
            });
          });
        });
      }
    })(req, res, next);
  });
};
