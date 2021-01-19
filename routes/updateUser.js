const passport = require('passport');
const tables = require('../sequelize');
const User = tables[0];

module.exports = (app) => {
  app.put('/updateUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        User.findOne({
          where: {
            username: req.body.username,
          },
        }).then((userInfo) => {
          if (userInfo != null) {
            console.log('user found in db');
            userInfo
              .update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
              })
              .then(() => {
                console.log('Utilizador atualizado!');
                res.status(200).send({ auth: true, message: 'Utilizador atualizado!' });
              });
          } else {
            console.error('Utilizador não localizado na BD para atualizar!');
            res.status(401).send('Utilizador não localizado na BD para atualizar!');
          }
        });
      }
    })(req, res, next);
  });
};