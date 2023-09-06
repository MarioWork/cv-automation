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

    //Object.keys(data).forEach(key => docBody.appendParagraph(data[key]));
    docBody.appendParagraph(JSON.stringify(data));
};

/*const displayDataOnDoc = data => {
    const docId = DocumentApp.getActiveDocument().getId();

    Object.keys(data).forEach(key => {
        const body = doc.getBody();

        body.appendParagraph(key);

        const dataValue = data[key];

        if (Array.isArray(dataValue)) {
            dataValue.forEach(value => displayDataOnDoc(value));
            return;
        }

        if (typeof dataValue === 'object') {
            displayDataOnDoc(dataValue);
            return;
        }

        body.appendParagraph(dataValue);
        doc.saveAndClose();
    });
};*/
