module.exports = (app) => {
  app.post("/logout", (req, res, next) => {
            res.status(200).send({
              auth: false,
              message: "Logout!",
            });
          });
  }