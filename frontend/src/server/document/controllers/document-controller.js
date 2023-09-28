//import 'google-apps-script';

const processDocument = async ({ base64File }) => {
    const idToken = ScriptApp.getIdentityToken();

    return processDocumentService_({ idToken, base64File });
};

const clearDocument = () => DocumentApp.getActiveDocument().getBody().clear();

const writeDataToDocument = data => createDocumentStructureService_(data);
