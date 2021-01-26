const passport = require("passport");
const tables = require("../sequelize");
const allbooks = require("./allbooks");
const Favorito = tables[2];
const User = tables[0];
let novoFav = null;
const Op = require("sequelize");

module.exports = (app) => {
  app.post("/clickFavorito", (req, res, next) => {
    const book = parseInt(req.body.item);
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log("Erro: " + err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message); // envia ao cliente a indicação da falha de autenticação
      } else {
        User.findOne({
          where: {
            username: user.username,
          },
        }).then((user) => {
          Favorito.findOne({
            where: {
              userid: user.id,
              bookid: book,
            },
          })
            .then(async (registo) => {
              if (registo != null) {
                registo.destroy(); // era favorito, já não é
              } else {
                Favorito.create({
                  userid: user.id,
                  bookid: book,
                });
                novoFav = {
                  userid: user.id,
                  bookid: book,
                  createdAt: null,
                  updatedAt: null,
                };
              }
            })
            .then(() => {
              Favorito.findAll({
                where: {
                  userid: user.id,
                },
              }).then((favs) => {
                if (novoFav != null) {
                  favs.push(novoFav);
                } else {
                  for (let i = 0; i < favs.length; i++) {
                    if (favs[i].bookid == book) {
                      favs.splice(i, 1);
                      break;
                    }
                  }
                }
                novoFav = null;
                res.status(200).send({
                  favoritos: JSON.stringify(favs, null, 2),
                });
              });
            });
        });
      }
    })(req, res, next);
  });
};
