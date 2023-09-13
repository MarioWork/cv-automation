const { extractText } = require('../services/document-ai');
const { organizeDataIntoDataStructure } = require('../services/vertex-ai');
const { to } = require('await-to-js');

module.exports = async (req, res) => {
    const file = req.body?.file;

    if (!file) return res.status(400).send('64BaseEncoded file missing.');

    console.log('Extracting text...');

    const [docError, docText] = await to(extractText({ file }));

    console.log('Finished Extracting text...');

    //TODO: MOve errors to service
    if (docError) {
        console.log(docError);
        return res.sendStatus(500);
    }

    console.log('Creating data structure...');

    const [aiError, data] = await to(
        organizeDataIntoDataStructure({ promptData: docText })
    );

    console.log('Finished Creating data structure...');

    //TODO: MOve errors to service
    if (aiError) {
        console.log(aiError);
        return res.sendStatus(500);
    }
    return res.send(data);
};
