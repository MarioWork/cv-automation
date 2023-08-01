const { extractText } = require('../services/document-ai');
const { organizeDataIntoDataStructure } = require('../services/vertex-ai');
const { to } = require('await-to-js');

module.exports = async (req, res) => {
    const file = req.body?.file;

    if (!file) return res.status(400).send('64BaseEncoded file missing.');

    const [docError, response] = await to(extractText({ file }));

    if (docError) {
        console.log(docError);
        return res.sendStatus(500);
    }

    const { document } = response[0];

    const [aiError, data] = await to(
        organizeDataIntoDataStructure(document.text)
    );

    if (aiError) {
        console.log(aiError);
        return res.sendStatus(500);
    }

    return res.send(data);
};
