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
    imageHeigh: 50,
    spacingBefore: 0
};

const docHierarchyLevel = {
    DOC_START: 0,
    NEW_ROW: 1,
    ROW_CHILD: 2
};

const docSectionTitles = {
    EDUCATION: 'Education / Training',
    PROFILE: 'Profile',
    TECHNICAL_SKILLS: 'Technical skills',
    LANGUAGES: 'Languages',
    PROJECTS: 'Projects'
};

let docIndex = 0;

//TODO: Add page numbers
//TODO: Add logo on top of header after first page
const createDocumentStructureService_ = data => {
    const candidateName = transformCandidateName_(data.name);

    const docBody = DocumentApp.getActiveDocument().getBody();
    docBody.setAttributes({ [DocumentApp.Attribute.FONT_FAMILY]: 'Inter' });

    const docStructure = [
        {
            level: docHierarchyLevel.DOC_START,
            type: docComponentsType.PARAGRAPH,
            value: candidateName,
            attributes: { fontSize: 32, bold: true },
            children: [
                {
                    level: docHierarchyLevel.ROW_CHILD,
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
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: data.jobTitle,
            attributes: {
                fontSize: 22
            }
        },
        {
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.EDUCATION,
            attributes: {
                fontSize: 22,
                spacingBefore: 70
            }
        },
        ...data.education.map(({ start, end, title, institution }) => ({
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: `${start}/${end} - ${title} | ${institution}`
        })),
        {
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.PROFILE,
            attributes: {
                fontSize: 22,
                spacingBefore: 30
            }
        },
        {
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: data.description
        },
        {
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.TECHNICAL_SKILLS,
            attributes: {
                fontSize: 22,
                spacingBefore: 30
            }
        },
        ...data.skills.map(skill => ({
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: skill
        })),
        {
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.LANGUAGES,
            attributes: {
                fontSize: 22,
                spacingBefore: 30
            }
        },
        ...data.languages.map(language => ({
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: language
        })),
        {
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.PROJECTS,
            attributes: {
                fontSize: 22,
                spacingBefore: 30
            }
        },
        ...data.workExperience.map(
            ({ company, address, start, end, title, description }) => ({
                level: docHierarchyLevel.NEW_ROW,
                type: docComponentsType.PARAGRAPH,
                value: `${company}, ${address} - Since ${start} @ ${end} ${title}`,
                attributes: {
                    bold: true
                },
                children: description.map(desc => ({
                    level: docHierarchyLevel.NEW_ROW,
                    type: docComponentsType.LIST_ITEM,
                    value: desc
                }))
            })
        )
    ];

    createDocStructure_({
        parent: docBody,
        children: docStructure
    });
};

const createDocStructure_ = ({ parent, children, level }) => {
    if (level < docHierarchyLevel.ROW_CHILD) docIndex++;

    children?.forEach(
        ({
            type: childType,
            value: childValue,
            attributes: childAttributes,
            children: childChildren,
            level: childLevel
        }) => {
            const component = createDocComponent_({
                parent,
                componentType: childType,
                value: childValue,
                attributes: childAttributes,
                level: childLevel
            });

            createDocStructure_({
                parent: component,
                children: childChildren,
                level: childLevel
            });
        }
    );
};

const createDocComponent_ = ({
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
        imageHeight: defaultImageHeight,
        spacingBefore: defaultSpacingBefore
    } = defaultDocComponentAttributes;

    const parentComponent =
        level < docHierarchyLevel.ROW_CHILD
            ? DocumentApp.getActiveDocument().getBody()
            : parent;

    if (componentType === docComponentsType.PARAGRAPH)
        return parentComponent
            .insertParagraph(docIndex, value ?? defaultValue)
            .setFontSize(attributes?.fontSize ?? defaultFontSize)
            .setBold(attributes?.bold ?? defaultBoldValue)
            .setForegroundColor(attributes?.fontColor ?? defaultFontColor)
            .setSpacingBefore(
                attributes?.spacingBefore ?? defaultSpacingBefore
            );

    if (componentType === docComponentsType.POSITIONED_IMAGE) {
        const image = UrlFetchApp.fetch(value).getBlob();
        return parentComponent
            .addPositionedImage(image)
            .setWidth(attributes?.width ?? defaultImageWidth)
            .setHeight(attributes?.height ?? defaultImageHeight)
            .setLeftOffset(attributes?.marginLeft ?? defaultMarginLeft);
    }

    if (componentType === docComponentsType.LIST_ITEM) {
        return parentComponent
            .insertListItem(docIndex, value ?? defaultValue)
            .setForegroundColor(attributes?.fontColor ?? defaultFontColor)
            .setFontSize(attributes?.fontSize ?? defaultFontSize)
            .setBold(attributes?.bold ?? defaultBoldValue)
            .setGlyphType(attributes?.glyphType ?? defaultGlyphType);
    }

    return DocumentApp.getActiveDocument().getBody();
};

const transformCandidateName_ = name => {
    const splittedCandidateName = name ? name.split(' ') : null;

    return splittedCandidateName
        ? splittedCandidateName[0] +
              ' ' +
              splittedCandidateName[splittedCandidateName.length - 1]
        : null;
};
