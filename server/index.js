const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');


const app = express();

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'development' );

app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(session({
    resave : false,
    secret : '@#@$MYSIGN#@$#$',
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        secure : false
    }
}))

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/upload', express.static('uploads'));

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});