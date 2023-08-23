const aiplatform = require('@google-cloud/aiplatform');

const createDataStructurePrompt = require('../utils/vertex-ai-data-structure-prompt');

const { PredictionServiceClient } = aiplatform.v1;

const { helpers } = aiplatform;

const predictionServiceClient = new PredictionServiceClient({
    apiEndpoint: 'us-central1-aiplatform.googleapis.com'
});

exports.organizeDataIntoDataStructure = async ({ promptData }) => {
    const prompt = createDataStructurePrompt(promptData);

    const instanceValue = helpers.toValue(prompt);

    const instances = [instanceValue];

    const parameter = {
        temperature: 0.2,
        maxOutputTokens: 1024,
        topP: 0.8,
        topK: 40
    };

    const parameters = helpers.toValue(parameter);

    const request = {
        endpoint: process.env.VERTEX_AI_TEXT_ENDPOINT,
        instances,
        parameters
    };

    const response = await predictionServiceClient.predict(request);

    const data =
        response[0].predictions[0].structValue.fields.candidates.listValue
            .values[0].structValue.fields.content.stringValue;

    //TODO: Return this as an object instead of string
    return { data };
};
