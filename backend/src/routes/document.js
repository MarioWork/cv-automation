const express = require('express');

const { to } = require('await-to-js');

const { extractText } = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    const file = req.body?.file;

    if (!file) return res.status(400).send('64BaseEncoded file missing.');

    const [error, response] = await to(extractText(file));

    if (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    const { document } = response;

    return res.send({ text: document.text });
});
