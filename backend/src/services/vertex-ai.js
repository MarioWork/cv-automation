const { aiplatform } = require('@google-cloud/aiplatform');

const client = new aiplatform.ModelServiceClient();

exports.organizeDataIntoDataStructure = ({ data }) => {
    const request = {
        projectId: process.env.GC_PROJECT_ID,
        modelId: process.env.GC_TEXT_MODEL_ID,
        text: data
    };

    return client.predict(request);
};
