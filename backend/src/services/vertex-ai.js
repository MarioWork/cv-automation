const aiplatform = require('@google-cloud/aiplatform');

const createDataStructurePrompt = require('../utils/prompt-creator.js');

const { PredictionServiceClient } = aiplatform.v1;

const { helpers } = aiplatform;

const predictionServiceClient = new PredictionServiceClient({
    apiEndpoint: 'us-central1-aiplatform.googleapis.com'
});

const messageAuthors = {
    USER: 'user',
    BOT: ' bot'
};

const loadMoreDataMsg = {
    author: messageAuthors.USER,
    content: `is there more? if yes send it if no send the word no`
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

const cleanUpSerializeData = dataStructureString =>
    JSON.parse(
        dataStructureString.replaceAll('```json', '').replaceAll('```', '')
    );

exports.organizeDataIntoDataStructure = async promptData => {
    let finalData = '';
    let loadMore = true;
    let messages = [{ author: messageAuthors.USER, content: promptData }];

    while (loadMore) {
        const prompt = createDataStructurePrompt(messages);
        const request = createRequest(prompt);
        const response = await predictionServiceClient.predict(request);

        const data =
            response[0].predictions[0].structValue.fields.candidates.listValue
                .values[0].structValue.fields.content.stringValue;

        if (data.trim() === 'no') {
            loadMore = false;
            break;
        }

        finalData += data;

        messages = [
            ...messages,
            { author: messageAuthors.BOT, content: data },
            loadMoreDataMsg
        ];
    }

    //TODO: For debugging purposes
    //return finalData;

    return cleanUpSerializeData(finalData);
};
