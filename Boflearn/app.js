// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cookieParser = require('cookie-parser'); // 쿠키 파서 추가
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const courseRouter = require('./routes/courseRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
