const express = require('express');
const Cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const app = express();

const API_PORT = process.env.API_PORT || 3000;
app.use(express.static("public"));
require('./config/passport');

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

require('./routes/loginUser')(app);
require('./routes/registerUser')(app);
require('./routes/findUsers')(app);
require('./routes/deleteUser')(app);
require('./routes/updateUser')(app);
require('./routes/logout')(app);
require('./routes/allbooks')(app);
require('./routes/clickFavorito')(app);

app.listen(API_PORT, () => console.log(`Estou a ouvir na porta ${API_PORT}`));

module.exports = app;