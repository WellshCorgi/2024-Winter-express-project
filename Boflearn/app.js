// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const courseRouter = require('./routes/courseRouter');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser()); 

app.use(
  session({
    secret: 'secretkey',
    resave: true, // 변경사항
    saveUninitialized: false, // 변경사항
  })
);

// 로그인 여부 확인 미들웨어
app.use((req, res, next) => {
  res.locals.loggedIn = !!req.cookies.jwt; 
  res.locals.userId = req.session ? req.session.userId : null;
  res.locals.userRole = req.session ? req.session.userRole : null;
  next();
});

app.use('/auth', require('./routes/authRouter'));
app.use('/user', require('./routes/userRouter'));
app.use('/delete', require('./routes/userRouter'));
app.use('/course', courseRouter);


app.get('/', (req, res) => {
  res.render('index', { loggedIn: res.locals.loggedIn, userId: res.locals.userId, userRole: res.locals.userRole });
});

app.get('/register', (req, res) => {
  res.render('register');
});


app.get('/login', (req, res) => {
  res.render('login');
});

// app.js
app.get('/course/create', (req, res) => {
  res.render('createCourse', { loggedIn: res.locals.loggedIn, userRole: res.locals.userRole, userId: res.locals.userId });
});

module.exports = app;