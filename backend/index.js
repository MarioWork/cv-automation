const express = require('express');

const app = express();

app.use('/document', require('./src/routes/document'));
app.use('/chat', require('./src/routes/chat'));

exports.app = app;
