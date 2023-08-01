const aiplatform = require('@google-cloud/aiplatform');

const { PredictionServiceClient } = aiplatform.v1;

const { helpers } = aiplatform;

const predictionServiceClient = new PredictionServiceClient({
    apiEndpoint: 'us-central1-aiplatform.googleapis.com'
});

async function callPredict() {
    const prompt = {
        prompt: 'When was Ronaldo Born?'
    };
    const instanceValue = helpers.toValue(prompt);
    const instances = [instanceValue];

    const parameter = {
        temperature: 0.2,
        maxOutputTokens: 1024,
        topP: 0.95,
        topK: 40
    };
    const parameters = helpers.toValue(parameter);

    const request = {
        endpoint: process.env.VERTEX_AI_TEXT_ENDPOINT,
        instances,
        parameters
    };

    const response = await predictionServiceClient.predict(request);
    console.log('Get text prompt response');
    console.log(response[0].predictions[0].structValue.fields.content);
}

callPredict();
