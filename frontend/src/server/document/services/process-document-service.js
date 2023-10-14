/**
 * Receives the user google identity token and the 64String File and returns extracted text
 * @param {{idToken: string, base64File: string}} params
 * @returns {{data: string}} extracted text
 */
const processDocumentService_ = ({ idToken, base64File }) => {
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
