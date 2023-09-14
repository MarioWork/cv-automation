//import 'google-apps-script';

const processDocument = async ({ base64File }) => {
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

    return JSON.parse(response.getContentText('UTF-8'));
};

const clearDocument = () => DocumentApp.getActiveDocument().getBody().clear();

const writeDataToDocument = data => {
    const splittedCandidateName = data.name ? data.name.split(' ') : null;

    const candidateName = splittedCandidateName
        ? splittedCandidateName[0] +
          ' ' +
          splittedCandidateName[splittedCandidateName.length - 1]
        : 'Unknown';

    const docBody = DocumentApp.getActiveDocument().getBody();

    //TODO: make it private and use id
    const logoImage = UrlFetchApp.fetch(
        'https://storage.googleapis.com/cv-document-images/oskon-logo.png'
    ).getBlob();

    docBody
        .insertParagraph(0, candidateName)
        .setFontSize(32)
        .setForegroundColor('#000000')
        .addPositionedImage(logoImage)
        .setWidth(300)
        .setHeight(60)
        .setLeftOffset(280);

    docBody
        .insertParagraph(1, data.jobTitle ?? 'Unknown')
        .setFontSize(22)
        .setForegroundColor('#717171');
};
