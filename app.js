const express = require('express');
const path =require('path');

const errorMiddleware = require('./middlewares/error.middleware');

const apiRoutes = require('./routers/app.routers');
const webRoutes=require('./routers/web/web.routes')
const session = require('express-session');
const MongoStore = require('connect-mongo')
const passport= require('./middlewares/passport.middleware')
const dbConfig =require('./db/db.config')
const { engine } = require ('express-handlebars')

const app = express();

//views
/* app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
  }))
  app.set('views', './views/layouts');
  app.set('view engine', 'hbs'); */

  app.engine('.hbs', engine({ extname: 'hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
  


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(session({
  name: 'my-session',
  secret: 'top-secret-51',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 120000 },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: dbConfig.mongodb.uri,
      collectionName: 'sessions'
  })
}));
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', webRoutes)
app.use('/api', apiRoutes);
app.use(errorMiddleware);

module.exports = app;