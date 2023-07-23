const express = require('express');

const { to } = require('await-to-js');

const { extractText } = require('../services/document-ai');

const router = express.Router();

router.post('/', async (req, res) => {
    const file = req.body?.file;

    if (!file) return res.status(400).send('64BaseEncoded file missing.');

    const [error, response] = await to(extractText({ file }));

    if (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    const { document } = response[0];

    return res.send(document.text);
});

module.exports = router;
