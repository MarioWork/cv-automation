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

    /*  const response = UrlFetchApp.fetch(
        'https://europe-west2-cv-automation-391816.cloudfunctions.net/cv-automation-api/document',
        config
    );
    const data = JSON.parse(response.getContentText('UTF-8')).data;
 */
    const docBody = DocumentApp.getActiveDocument().getBody();

    /*     docBody.appendParagraph(JSON.stringify(data));
     */

    const image = UrlFetchApp.fetch(
        'https://storage.googleapis.com/cv-document-images/oskon-logo.png'
    ).getBlob();

    const docImage = docBody.insertImage(0, image);

    docImage.setAttributes({
        [DocumentApp.Attribute.HORIZONTAL_ALIGNMENT]:
            DocumentApp.HorizontalAlignment.RIGHT
    });

    docImage.setWidth(250);
    docImage.setHeigh(150);
};
