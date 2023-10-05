const aiplatform = require('@google-cloud/aiplatform');

const createDataStructurePrompt = require('../utils/prompt-creator.js');

const { PredictionServiceClient } = aiplatform.v1;

const { jsonrepair } = require('jsonrepair');

const { helpers } = aiplatform;

const predictionServiceClient = new PredictionServiceClient({
    apiEndpoint: 'us-central1-aiplatform.googleapis.com'
});

const messageAuthors = {
    USER: 'user',
    BOT: ' bot'
};

const ESCAPE_CODE = '#11#22';

/**
 * Object that represents a message to be sent to the A.I to check if there is a part of the data missing
 * in case the tokens are surpassed
 */
const loadMoreDataMsg = {
    author: messageAuthors.USER,
    content: `If there is no more data missing send the word '${ESCAPE_CODE}' otherwise send the missing data only`
};

const createRequest = prompt => {
    const instanceValue = helpers.toValue(prompt);

    const instances = [instanceValue];

    const parameter = {
        temperature: 0.2,
        maxOutputTokens: 1024,
        topP: 0.8,
        topK: 40
    };

    const parameters = helpers.toValue(parameter);

    return {
        endpoint: process.env.VERTEX_AI_TEXT_ENDPOINT,
        instances,
        parameters
    };
};

/**
 * Cleans up the json string returned by the A.I, repairs the json  and serializes it
 * @param {String} jsonData
 * @returns {object}
 */
const cleanUpRepairSerializeJsonData = jsonData => {
    //Sometimes the A.I returns the Json object indented with json code
    const jsonDataCleaned = jsonData
        .replaceAll('```json', '')
        .replaceAll('```', '')
        .replace(ESCAPE_CODE, '');

    const jsonDataRepaired = jsonrepair(jsonDataCleaned);

    return JSON.parse(jsonDataRepaired);
};

exports.organizeDataIntoDataStructure = async promptData => {
    let data = '';
    let loadMore = true;
    let messages = [{ author: messageAuthors.USER, content: promptData }];

    while (loadMore) {
        const prompt = createDataStructurePrompt(messages);
        const request = createRequest(prompt);
        const response = await predictionServiceClient.predict(request);

        //Extract value from response
        const respData =
            response[0].predictions[0].structValue.fields.candidates.listValue
                .values[0].structValue.fields.content.stringValue;

        if (respData.trim().toLowerCase() === ESCAPE_CODE) {
            loadMore = false;
            break;
        }

        data += respData;

        messages = [
            ...messages,
            { author: messageAuthors.BOT, content: data },
            loadMoreDataMsg
        ];
    }

    return cleanUpRepairSerializeJsonData(data);
};
