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

    docBody.setAttributes({ [DocumentApp.Attribute.FONT_FAMILY]: 'Inter' });

    //Header
    docBody
        .insertParagraph(paragraphIndex++, candidateName)
        .setFontSize(32)
        .setBold(true)
        .setForegroundColor('#000000')
        .addPositionedImage(logoImage)
        .setWidth(330)
        .setHeight(60)
        .setLeftOffset(220);

    docBody
        .insertParagraph(paragraphIndex++, data.jobTitle ?? 'Unknown')
        .setForegroundColor('#000000')
        .setBold(false)
        .setFontSize(22);

    //Education/Training
    docBody

        .insertParagraph(paragraphIndex++, 'Education / Training')
        .setSpacingBefore(70)
        .setFontSize(24)
        .setForegroundColor('#000000');

    data.education.forEach(({ start, end, title, institution }) => {
        const educationText = `${start}/${end} - ${title} | ${institution}`;
        docBody
            .insertParagraph(paragraphIndex++, educationText)
            .setFontSize(12);
    });

    //Profile
    docBody
        .insertParagraph(paragraphIndex++, 'Profile')
        .setForegroundColor('#000000')
        .setSpacingBefore(30)
        .setFontSize(24);

    docBody
        .insertParagraph(paragraphIndex++, data.description ?? 'No description')
        .setForegroundColor('#000000')
        .setFontSize(12);

    //Technical skills
    docBody
        .setForegroundColor('#000000')
        .insertParagraph(paragraphIndex++, 'Technical skills')
        .setSpacingBefore(30)
        .setFontSize(24);

    data.skills.forEach(skill =>
        docBody
            .insertParagraph(paragraphIndex++, skill)
            .setFontSize(12)
            .setForegroundColor('#000000')
    );

    //Languages
    docBody
        .insertParagraph(paragraphIndex++, 'Languages')
        .setSpacingBefore(30)
        .setFontSize(24)
        .setForegroundColor('#000000');

    if (data.languages.length == 0)
        docBody
            .insertParagraph(paragraphIndex++, 'No Languages')
            .setForegroundColor('#FF0000')
            .setFontSize(12);

    data.languages.forEach(language =>
        docBody
            .insertParagraph(paragraphIndex++, language)
            .setFontSize(12)
            .setForegroundColor('#000000')
    );

    //Projects
    docBody
        .insertParagraph(paragraphIndex++, 'Projects')
        .setSpacingBefore(30)
        .setFontSize(24)
        .setForegroundColor('#000000');

    data.workExperience.forEach(
        ({ company, address, start, end, title, description }) => {
            const docExperienceTitle = `${company}, ${address} - Since ${start} @ ${end} ${title}`;

            docBody
                .insertParagraph(paragraphIndex++, docExperienceTitle)
                .setFontSize(12)
                .setBold(true)
                .setForegroundColor('#000000');

            if (description.length <= 0)
                docBody
                    .insertListItem(paragraphIndex++, 'No Description')
                    .setForegroundColor('#FF0000')
                    .setFontSize(12)
                    .setBold(false)
                    .setGlyphType(DocumentApp.GlyphType.BULLET);

            description.forEach(desc =>
                docBody
                    .insertListItem(paragraphIndex++, desc)
                    .setForegroundColor('#000000')
                    .setFontSize(12)
                    .setBold(false)
                    .setGlyphType(DocumentApp.GlyphType.BULLET)
            );
        }
    );
};
