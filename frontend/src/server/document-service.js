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
    /*  //TODO: make it private and use id
    const logoImage = UrlFetchApp.fetch(
        'https://storage.googleapis.com/cv-document-images/oskon-logo.png'
    ).getBlob();

    let paragraphIndex = 0;

    docBody.setAttributes({ [DocumentApp.Attribute.FONT_FAMILY]: 'Inter' }); */

    const docComponentsType = {
        TEXT: 'text',
        PARAGRAPH: 'paragraph',
        POSITIONED_IMAGE: 'positioned image',
        LIST_ITEM: 'list item'
    };

    const defaultDocComponentAttributes = {
        fontColor: '#000000',
        fontSize: 12,
        bold: false,
        marginLeft: 0,
        glyphType: DocumentApp.GlyphType.BULLET,
        value: 'Unknown',
        imageWidth: 100,
        imageHeigh: 50
    };

    const docSectionTitles = {
        EDUCATION: 'Education / Training',
        PROFILE: 'Profile',
        TECHNICAL_SKILLS: 'Technical skills',
        LANGUAGES: 'Languages',
        PROJECTS: 'Projects'
    };

    const splittedCandidateName = data.name ? data.name.split(' ') : null;

    const candidateName = splittedCandidateName
        ? splittedCandidateName[0] +
          ' ' +
          splittedCandidateName[splittedCandidateName.length - 1]
        : null;

    const docBody = DocumentApp.getActiveDocument().getBody();

    //Level 0 means its a new document row | only component type is required the rest has default values
    const docStructure = [
        {
            level: 0,
            type: docComponentsType.PARAGRAPH,
            value: candidateName,
            attributes: { fontSize: 32, bold: true },
            children: [
                {
                    level: 2,
                    type: docComponentsType.POSITIONED_IMAGE,
                    value: 'https://storage.googleapis.com/cv-document-images/oskon-logo.png',
                    attributes: {
                        width: 330,
                        height: 60,
                        marginLeft: 220
                    }
                }
            ]
        },
        {
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: data.jobTitle,
            attributes: {
                fontSize: 22
            }
        },
        {
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.EDUCATION,
            attributes: {
                fontSize: 22,
                spacingBefore: 70
            }
        },
        ...data.education.map(({ start, end, title, institution }) => ({
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: `${start}/${end} - ${title} | ${institution}`
        })),
        {
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.PROFILE,
            attributes: {
                fontSize: 22,
                spacingBefore: 30
            }
        },
        {
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: data.description
        },
        {
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.TECHNICAL_SKILLS,
            attributes: {
                fontSize: 22,
                spacingBefore: 30
            }
        },
        ...data.skills.map(skill => ({
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: skill
        })),
        {
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.LANGUAGES,
            attributes: {
                fontSize: 22,
                spacingBefore: 30
            }
        },
        ...data.languages.map(language => ({
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: language
        })),
        {
            level: 1,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.PROJECTS,
            attributes: {
                fontSize: 22,
                spacingBefore: 30
            }
        },
        ...data.workExperience.map(
            ({ company, address, start, end, title, description }) => ({
                level: 1,
                type: docComponentsType.PARAGRAPH,
                value: `${company}, ${address} - Since ${start} @ ${end} ${title}`,
                attributes: {
                    bold: true
                },
                children: description.map(desc => ({
                    level: 1,
                    type: docComponentsType.LIST_ITEM,
                    value: desc
                }))
            })
        )
    ];

    let docIndex = 0;

    const createDocStructure = ({ parent, children, level }) => {
        if (level < 2) docIndex++;

        children?.forEach(
            ({
                type: childType,
                value: childValue,
                attributes: childAttributes,
                children: childChildren,
                level: childLevel
            }) => {
                const component = createDocComponent({
                    parent,
                    componentType: childType,
                    value: childValue,
                    attributes: childAttributes,
                    level: childLevel
                });

                createDocStructure({
                    parent: component,
                    children: childChildren,
                    level: childLevel
                });
            }
        );
    };

    const createDocComponent = ({
        parent,
        componentType,
        value,
        attributes,
        level
    }) => {
        const {
            fontColor: defaultFontColor,
            bold: defaultBoldValue,
            fontSize: defaultFontSize,
            marginLeft: defaultMarginLeft,
            glyphType: defaultGlyphType,
            value: defaultValue,
            imageWidth: defaultImageWidth,
            imageHeight: defaultImageHeight
        } = defaultDocComponentAttributes;

        const comp =
            level < 2 ? DocumentApp.getActiveDocument().getBody() : parent;

        if (componentType === docComponentsType.PARAGRAPH)
            return comp
                .insertParagraph(docIndex, value ?? defaultValue)
                .setFontSize(attributes?.fontSize ?? defaultFontSize)
                .setBold(attributes?.bold ?? defaultBoldValue)
                .setForegroundColor(attributes?.fontColor ?? defaultFontColor)
                .setSpacingBefore(attributes?.spacingBefore ?? 0);

        if (componentType === docComponentsType.POSITIONED_IMAGE) {
            const image = UrlFetchApp.fetch(value).getBlob();
            return comp
                .addPositionedImage(image)
                .setWidth(attributes?.width ?? defaultImageWidth)
                .setHeight(attributes?.height ?? defaultImageHeight)
                .setLeftOffset(attributes?.marginLeft ?? defaultMarginLeft);
        }

        if (componentType === docComponentsType.LIST_ITEM) {
            return comp
                .insertListItem(docIndex, value ?? defaultValue)
                .setForegroundColor(attributes?.fontColor ?? defaultFontColor)
                .setFontSize(attributes?.fontSize ?? defaultFontSize)
                .setBold(attributes?.bold ?? defaultBoldValue)
                .setGlyphType(attributes?.glyphType ?? defaultGlyphType);
        }

        return DocumentApp.getActiveDocument().getBody();
    };

    createDocStructure({
        parent: docBody,
        children: docStructure
    });
};
