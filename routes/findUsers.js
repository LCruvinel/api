const passport = require("passport");

module.exports = (app) => {
  app.post("/findUsers", (req, res, next) => {
    console.log("*** FIND USERS ***");
    console.log(req.headers);
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message); // envia ao cliente a indicação da falha de autenticação
      } else {
        console.log("Utilizador encontrado na BD - da rota findUser!");
        res.status(200).send({
          auth: true,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          username: user.username,
          password: user.password,
          message: "Utilizador encontrado na BD!",
        });
      }
    })(req, res, next);
  });
};