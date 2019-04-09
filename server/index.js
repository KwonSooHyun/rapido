const express = require('express');
const path = require('path');
const morgan = require('morgan');

const userRouter = require('./routes/user');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'development' );

app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use('/user', userRouter);


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});