const aiplatform = require('@google-cloud/aiplatform');

const { PredictionServiceClient } = aiplatform.v1;

const { helpers } = aiplatform;

const predictionServiceClient = new PredictionServiceClient();

module.exports = async function callPredict() {
    const prompt = {
        prompt: 'Give me ten interview questions for the role of program manager.'
    };
    const instanceValue = helpers.toValue(prompt);
    const instances = [instanceValue];

    console.log(instances[0].structValue.fields);

    const parameter = {
        temperature: 0.2,
        maxOutputTokens: 5,
        topP: 0.95,
        topK: 40
    };
    const parameters = helpers.toValue(parameter);

    const request = {
        endpoint: process.env.VERTEX_AI_TEXT_ENDPOINT,
        instances,
        parameters
    };

    try {
        const response = await predictionServiceClient.predict(request);
        console.log('Get text prompt response');
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
