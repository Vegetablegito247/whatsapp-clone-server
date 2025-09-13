const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connection } = require('./config/connection');
const sendChat = require('./routes/chat/sendChat');
const getChat = require('./routes/chat/getChat');
const editChat = require('./routes/chat/editChat');
const delChat = require('./routes/chat/delChat');
const createUser = require('./routes/users/createUser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Message api
app.post('/sendChat', sendChat)
app.get('/getChats', getChat)
app.put('/editChat/:id', editChat)
app.delete('/delChat/:id', delChat)

// User api
app.post('/createUser', createUser)

connection({ app, port: process.env.PORT || 8000 });