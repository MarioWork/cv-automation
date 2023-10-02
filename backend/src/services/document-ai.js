require('dotenv').config();

const { DocumentProcessorServiceClient } =
    require('@google-cloud/documentai').v1;

const client = new DocumentProcessorServiceClient({
    apiEndpoint: 'eu-documentai.googleapis.com'
});

exports.extractText = async ({ file }) => {
    const request = {
        name: process.env.DOC_AI_PROCESSOR_ENDPOINT,
        rawDocument: {
            content: file,
            mimeType: 'application/pdf'
        }
    };

    const response = await client.processDocument(request);

    return response[0].document.text;
};
