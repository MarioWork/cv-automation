const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.use('/document', require('./src/routes/document'));
app.use('/chat', require('./src/routes/chat'));

exports.app = app;
