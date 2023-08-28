//TODO: Find a way for this import not interfere with google apps script
//import 'google-apps-script';

const extractText = async ({ encoded64File }) => {
    const idToken = ScriptApp.getIdentityToken();

    const config = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + idToken
        },
        payload: {
            file: encoded64File
        }
    };

    const response = UrlFetchApp.fetch(
        'https://europe-west2-cv-automation-391816.cloudfunctions.net/cv-automation-api/document',
        config
    );

    const data = JSON.parse(response.getContentText('UTF-8')).data;

    displayDataOnDoc(data);
};

const displayDataOnDoc = data => {
    const body = DocumentApp.getActiveDocument().getBody();

    Object.keys(data).forEach(key => {
        body.appendParagraph(key);

        const dataValue = data[key];

        if (Array.isArray(dataValue)) {
            dataValue.forEach(value => displayDataOnDoc(dataValue));
            return;
        }

        if (typeof dataValue === 'object') {
            displayDataOnDoc(dataValue);
            return;
        }

        body.appendParagraph(dataValue);
    });
};
