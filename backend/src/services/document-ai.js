require('dotenv').config();

const { to } = require('await-to-js');

const { DocumentProcessorServiceClient } =
    require('@google-cloud/documentai').v1;

const client = new DocumentProcessorServiceClient({
    apiEndpoint: 'eu-documentai.googleapis.com'
});

exports.extractText = file => {
    const request = {
        name: process.env.DOC_AI_PROCESSOR_ENDPOINT,
        rawDocument: {
            content: file,
            mimeType: 'application/pdf'
        }
    };

    return client.processDocument(request);
};
