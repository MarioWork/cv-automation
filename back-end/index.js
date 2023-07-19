require('dotenv').config();

const express = require('express');

const { DocumentProcessorServiceClient } =
    require('@google-cloud/documentai').v1;

const fs = require('fs').promises;

const filePath = 'CV-Mario-Vieira.pdf';

const name = `projects/${process.env.PROJECT_NR}/locations/eu/processors/${process.env.PROCESSOR_ID}`;

const app = express();

const client = new DocumentProcessorServiceClient({
    apiEndpoint: 'eu-documentai.googleapis.com'
});

app.get('/', async (req, res) => {
    //const file = await fs.readFile(filePath);

    //const encodedFile = Buffer.from(file).toString('base64');

    const request = {
        name,
        rawDocument: {
            content: req.body.file64encoded,
            mimeType: 'application/pdf'
        }
    };
    try {
        const [result] = await client.processDocument(request);
        const { document } = result;

        res.send({ text: document.text });
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
});

exports.app = app;
