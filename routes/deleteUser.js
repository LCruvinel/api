const passport = require("passport");
const tables = require("../sequelize");
const User = tables[0];

module.exports = (app) => {
  app.delete("/deleteUser", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        User.destroy({
          where: {
            username: req.body.username,
          },
        })
          .then((userInfo) => {
            if (userInfo === 1) {
              console.log("Utilizador eliminado da BD!");
              res.status(200).send("Utilizador eliminado da BD!");
            } else {
              console.error("Utilizador não localizado na BD!");
              res
                .status(404)
                .send(
                  "Não há utilizador com esta identificação para eliminar!"
                );
            }
          })
          .catch((error) => {
            console.error("Problemas na comunicação com a BD!");
            res.status(500).send(error);
          });
      }
    })(req, res, next);
  });
};
