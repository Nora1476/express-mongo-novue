var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// DB연결 모듈
const connect = require('./schemas')


// 라우터 모듈
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');

var app = express();

// view engine html로 사용할 수 있도록 설정
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// 몽고 디비 연결
connect();

app.use(logger('dev'));                                                      // 로그 미들웨어
app.use(express.json());                                                     // post요청 올때 json파싱 미들웨어
app.use(express.urlencoded({ extended: false }));                            // get요청 올때 url형식 데이터 파싱 미들웨어
app.use(express.static(path.join(__dirname, 'public')));                     // 기본경로 미들웨어
app.use(cookieParser());


// 라우터 연결
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);


// catch 404 and forward to error handler
// 만일 위 라우터에서 요청이 end되지않으면 실행 -> 라우터 없음
app.use(function(req, res, next) {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  next(createError(404));
});

// error handler 에러처리 미들웨어
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
