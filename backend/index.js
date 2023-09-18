const express = require('express');
const helmet = require('helmet');

const app = express();

app.use('/document', require('./src/routes/document'));
app.use('/chat', require('./src/routes/chat'));

app.use(helmet());

app.use(require('./src/middleware/error-handler'));

exports.app = app;
