const tables = require("../sequelize");
const passport = require("passport");
const User = tables[0];

module.exports = (app) => {
  app.post("/registerUser", (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        res.status(200).send({message: `${info.message}`}); // envia ao cliente a indicação da falha de registo
      } else {
        req.logIn(user, (err) => {
          // este método é necessário para as callback funcionarem
          const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: user.username,
          };
          User.findOne({
            where: {
              username: data.username,
            },
          }).then((user) => {
            user
              .update({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
              })
              .then(() => {
                console.log("Utilizador criado na BD!");
                res.status(200).send({ message: "Utilizador adicionado!" });
              });
          });
        });
      }
    })(req, res, next);
  });
};
