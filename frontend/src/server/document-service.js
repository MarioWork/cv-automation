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

//TODO: After revision organize into a better doc creation algorithm
//TODO: Add page numbers
//TODO: Add logo on top of header after first page
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

    let paragraphIndex = 0;

    //Header
    docBody
        .insertParagraph(paragraphIndex++, candidateName)
        .setFontSize(32)
        .setBold(true)
        .setForegroundColor('#000000')
        .addPositionedImage(logoImage)
        .setWidth(330)
        .setHeight(60)
        .setLeftOffset(280);

    docBody
        .insertParagraph(paragraphIndex++, data.jobTitle ?? 'Unknown')
        .setBold(false)
        .setFontSize(22)
        .setForegroundColor('#717171');

    //Education/Training
    docBody
        .insertParagraph(paragraphIndex++, 'Education/Training')
        .setSpacingBefore(70)
        .setFontSize(24)
        .setForegroundColor('#000000');

    data.education.forEach(
        ({ startingDate, finishDate, title, institution }) => {
            const educationText = `${startingDate}/${finishDate} - ${title} | ${institution}`;
            docBody
                .insertParagraph(paragraphIndex++, educationText)
                .setFontSize(12);
        }
    );

    //Profile
    docBody
        .insertParagraph(paragraphIndex++, 'Profile')
        .setSpacingBefore(30)
        .setFontSize(24);

    docBody
        .insertParagraph(paragraphIndex++, data.description ?? 'No description')
        .setFontSize(12);

    //Technical skills
    docBody
        .insertParagraph(paragraphIndex++, 'Technical skills')
        .setSpacingBefore(30)
        .setFontSize(24);

    data.skills.forEach(skill =>
        docBody.insertParagraph(paragraphIndex++, skill).setFontSize(12)
    );

    //Languages
    docBody
        .insertParagraph(paragraphIndex++, 'Languages')
        .setSpacingBefore(30)
        .setFontSize(24);

    if (data.language.length > 0)
        data.language.forEach(language =>
            docBody.insertParagraph(paragraphIndex++, language).setFontSize(12)
        );

    docBody.insertParagraph(paragraphIndex++, 'No Languages').setFontSize(12);

    //Projects
    docBody
        .insertParagraph(paragraphIndex++, 'Projects')
        .setSpacingBefore(30)
        .setFontSize(24);

    data.workExperience.forEach(
        ({
            company,
            location,
            startingDate,
            finishDate,
            title,
            description
        }) => {
            const docExperienceTitle = `${company}, ${location} - Since ${startingDate} @ ${finishDate} ${title}`;
            docBody
                .insertParagraph(paragraphIndex++, docExperienceTitle)
                .setFontSize(12)
                .setBold(true);
            docBody
                .insertListItem(
                    paragraphIndex++,
                    description ?? 'No description'
                )
                .setFontSize(12)
                .setBold(false)
                .setGlyphType(DocumentApp.GlyphType.BULLET);
        }
    );
};
