const extractText = async data => {
    const idToken = ScriptApp.getIdentityToken();

    Logger.log(idToken);

    /*const config = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + idToken
        }
    };

    const response = UrlFetchApp.fetch(
        'https://europe-west2-cv-automation-391816.cloudfunctions.net/cv-automation-api/document',
        config
    );

    Logger.log(response);*/

    return idToken;
};
