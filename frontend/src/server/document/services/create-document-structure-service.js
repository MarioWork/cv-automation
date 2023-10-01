const docComponentsType = {
    TEXT: 'text',
    PARAGRAPH: 'paragraph',
    POSITIONED_IMAGE: 'positioned image',
    LIST_ITEM: 'list item'
};

const colors = {
    BLACK: '#000000',
    LIGHT_GRAY: '#434343'
};

const defaultDocComponentAttributes = {
    fontColor: colors.BLACK,
    fontSize: 12,
    bold: false,
    marginLeft: 0,
    glyphType: DocumentApp.GlyphType.BULLET,
    value: 'Unknown',
    imageWidth: 100,
    imageHeigh: 50,
    spacingBefore: 0,
    headingStyle: DocumentApp.ParagraphHeading.NORMAL,
    fontFamily: 'inter'
};

const docHeadingStyles = {
    TITLE: DocumentApp.ParagraphHeading.TITLE,
    SUBTITLE: DocumentApp.ParagraphHeading.SUBTITLE,
    NORMAL: DocumentApp.ParagraphHeading.NORMAL,
    HEADING1: DocumentApp.ParagraphHeading.HEADING1,
    HEADING2: DocumentApp.ParagraphHeading.HEADING2
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

const createEducationTitle_ = ({ start, end, title, institution }) =>
    `${start ?? defaultDocComponentAttributes.value}/${
        end ?? defaultDocComponentAttributes.value
    } - ${title ?? defaultDocComponentAttributes.value} | ${
        institution ?? defaultDocComponentAttributes
    }`;

const createWorkExperienceTitle_ = ({ company, address, start, end, title }) =>
    `${company ?? defaultDocComponentAttributes.value}, ${
        address ?? defaultDocComponentAttributes.value
    } - Since ${start ?? defaultDocComponentAttributes.value} @ ${
        end ?? defaultDocComponentAttributes.value
    } ${title ?? defaultDocComponentAttributes.value}`;

const createCandidateName_ = name => {
    const splittedCandidateName = name ? name.split(' ') : null;

    return splittedCandidateName
        ? splittedCandidateName[0] +
              ' ' +
              splittedCandidateName[splittedCandidateName.length - 1]
        : null;
};

let docIndex = 0;

//TODO: Add page numbers
//TODO: Add logo on top of header after first page
const createDocumentStructureService_ = data => {
    const candidateName = createCandidateName_(data.name);

    const docBody = DocumentApp.getActiveDocument().getBody();
    docBody.setAttributes({
        [DocumentApp.Attribute.FONT_FAMILY]:
            defaultDocComponentAttributes.fontFamily
    });

    const docStructure = [
        {
            level: docHierarchyLevel.DOC_START,
            type: docComponentsType.PARAGRAPH,
            value: candidateName,
            attributes: {
                fontSize: 32,
                bold: true,
                headingStyle: docHeadingStyles.TITLE
            },
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
                fontSize: 22,
                headingStyle: docHeadingStyles.SUBTITLE,
                fontColor: colors.LIGHT_GRAY
            }
        },
        {
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.EDUCATION,
            attributes: {
                fontSize: 22,
                spacingBefore: 70,
                headingStyle: docHeadingStyles.HEADING1
            }
        },
        ...data.education.map(education => ({
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: createEducationTitle_(education),
            attributes: { spacingBefore: 10 }
        })),
        {
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: docSectionTitles.PROFILE,
            attributes: {
                fontSize: 22,
                spacingBefore: 30,
                headingStyle: docHeadingStyles.HEADING1
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
                spacingBefore: 30,
                headingStyle: docHeadingStyles.HEADING1
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
                spacingBefore: 30,
                headingStyle: docHeadingStyles.HEADING1
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
                spacingBefore: 30,
                headingStyle: docHeadingStyles.HEADING1
            }
        },
        ...data.workExperience.map(experience => ({
            level: docHierarchyLevel.NEW_ROW,
            type: docComponentsType.PARAGRAPH,
            value: createWorkExperienceTitle_(experience),
            attributes: {
                bold: true,
                spacingBefore: 10
            },
            children: experience.description.map(desc => ({
                level: docHierarchyLevel.NEW_ROW,
                type: docComponentsType.LIST_ITEM,
                value: desc ?? defaultDocComponentAttributes.value
            }))
        }))
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
        spacingBefore: defaultSpacingBefore,
        headingStyle: defaultHeadingStyle
    } = defaultDocComponentAttributes;

    const parentComponent =
        level < docHierarchyLevel.ROW_CHILD
            ? DocumentApp.getActiveDocument().getBody()
            : parent;

    if (componentType === docComponentsType.PARAGRAPH)
        return parentComponent
            .insertParagraph(docIndex, value ?? defaultValue)
            .setHeading(attributes?.headingStyle ?? defaultHeadingStyle)
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
