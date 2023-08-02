const extractText = async data => {
    const accessToken = ScriptApp.getOAuthToken();

    const config = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    };

    const response = UrlFetchApp.fetch(
        'https://europe-west2-cv-automation-391816.cloudfunctions.net/cv-automation-api/document',
        config
    );

    Logger.log(response);
};
