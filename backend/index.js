require('dotenv').config();
const { to } = require('await-to-js');

const express = require('express');

const { DocumentProcessorServiceClient } =
    require('@google-cloud/documentai').v1;

const app = express();

const client = new DocumentProcessorServiceClient({
    apiEndpoint: 'eu-documentai.googleapis.com'
});

app.get('/', async (req, res) => {
    const file = req.body?.file;

    if (!file) return res.status(400).send('64BaseEncoded file missing.');

    const request = {
        name: process.env.DOC_AI_PROCESSOR_ENDPOINT,
        rawDocument: {
            content: file,
            mimeType: 'application/pdf'
        }
    };

    const [error, response] = await to(client.processDocument(request));

    if (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    const { document } = response;

    res.send({ text: document.text });
});

exports.app = app;
