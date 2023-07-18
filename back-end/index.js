const express = require('express');

const app = express();

app.get('/', (req, res) =>
    res.send({ message: 'Hello World from my function!' })
);

exports.app = app;
