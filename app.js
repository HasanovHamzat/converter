const express = require('express');
const path = require('path');
const createError = require('http-errors');
const hbs = require('hbs');
const logger = require('morgan');
const session = require('express-session');
const redis = require("redis");
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
const PORT = 3000;
const app = express();
const { User } = require('./src/db/models');

const indexRouter = require('./src/routes/index.router');
const authRouter = require('./src/routes/auth.router');
const profileRouter = require('./src/routes/profile.router');
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use(express.json()); // <- 'application/json'
app.use(express.urlencoded({ extended: true })); // <- 'application/x-www-form-urlencoded'

app.use(session({
  key: 'sid',
  secret: 'ghdknvds',
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 3000, client: redisClient }),
  saveUninitialized: false,
  resave: false,
  httpOnly: true,
  cookie: { expires: 24 * 60 * 60e3 }
}));

app.use((req, res, next) => {
  res.locals.userId = req.session?.userId;
  next();
});

app.use(async (req, res, next) => {
  if(req.session.userId) {
    let currUser = await User.findOne({ where: { id: req.session?.userId } })
  
    res.locals.userName = currUser.name;
    res.locals.userSurname = currUser.surname;
    res.locals.userEmail = currUser.email;

  }

  next();
});


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter)

app.listen(PORT, () => {
  console.log('Server has been started on port', PORT)
});

