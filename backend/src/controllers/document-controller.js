const createError = require('http-errors');

const { errorMessages } = require('../utils/error-messages');
const { extractText } = require('../services/document-ai');
const {
    organizeDataIntoDataStructure
} = require('../services/data-structure-vertex-ai');

module.exports = async (req, res, next) => {
    const file = req.body?.file;

    if (!file) next(new createError(400, errorMessages.MISSING_FILE_FIELD));

    extractText({ file })
        .then(organizeDataIntoDataStructure)
        .then(data => res.send(data))
        .catch(error => next(error));
};
