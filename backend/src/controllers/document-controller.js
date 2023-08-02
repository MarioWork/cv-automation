const { extractText } = require('../services/document-ai');
const { organizeDataIntoDataStructure } = require('../services/vertex-ai');
const { to } = require('await-to-js');

module.exports = async (req, res) => {
    const file = req.body?.file;

    if (!file) return res.status(400).send('64BaseEncoded file missing.');

    const [docError, docText] = await to(extractText({ file }));

    if (docError) {
        console.log(docError);
        return res.sendStatus(500);
    }

    const [aiError, data] = await to(
        organizeDataIntoDataStructure({ promptData: docText })
    );

    if (aiError) {
        console.log(aiError);
        return res.sendStatus(500);
    }

    return res.send(data);
};
