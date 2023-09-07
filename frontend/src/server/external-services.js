//import 'google-apps-script';

const processCv = async ({ base64File }) => {
    const idToken = ScriptApp.getIdentityToken();

    const config = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + idToken
        },
        payload: {
            file: base64File
        }
    };

    const response = UrlFetchApp.fetch(
        'https://europe-west2-cv-automation-391816.cloudfunctions.net/cv-automation-api/document',
        config
    );
    const data = JSON.parse(response.getContentText('UTF-8')).data;

    const docBody = DocumentApp.getActiveDocument().getBody();

    docBody.appendParagraph(JSON.stringify(data));
};
