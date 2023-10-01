const docComponentsType = {
    TEXT: 'text',
    PARAGRAPH: 'paragraph',
    POSITIONED_IMAGE: 'positioned image',
    LIST_ITEM: 'list item'
};

const colors = {
    BLACK: '#000000',
    LIGHT_GRAY: '#434343',
    RED: '#F00000'
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
    fontFamily: 'inter',
    noValueFontColor: colors.RED
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

const docTitlesComponents = {
    EDUCATION: {
        level: docHierarchyLevel.NEW_ROW,
        type: docComponentsType.PARAGRAPH,
        value: 'Education / Training',
        attributes: {
            fontSize: 24,
            spacingBefore: 50,
            headingStyle: docHeadingStyles.HEADING1
        }
    },
    PROFILE: {
        level: docHierarchyLevel.NEW_ROW,
        type: docComponentsType.PARAGRAPH,
        value: 'Profile',
        attributes: {
            fontSize: 24,
            spacingBefore: 50,
            headingStyle: docHeadingStyles.HEADING1
        }
    },
    TECHNICAL_SKILLS: {
        level: docHierarchyLevel.NEW_ROW,
        type: docComponentsType.PARAGRAPH,
        value: 'Technical Skills',
        attributes: {
            fontSize: 24,
            spacingBefore: 50,
            headingStyle: docHeadingStyles.HEADING1
        }
    },
    LANGUAGES: {
        level: docHierarchyLevel.NEW_ROW,
        type: docComponentsType.PARAGRAPH,
        value: 'Languages',
        attributes: {
            fontSize: 24,
            spacingBefore: 50,
            headingStyle: docHeadingStyles.HEADING1
        }
    },
    PROJECTS: {
        level: docHierarchyLevel.NEW_ROW,
        type: docComponentsType.PARAGRAPH,
        value: 'Projects',
        attributes: {
            fontSize: 24,
            spacingBefore: 50,
            headingStyle: docHeadingStyles.HEADING1
        }
    }
};

const defaultUnknownComponent = {
    level: docHierarchyLevel.NEW_ROW,
    type: docComponentsType.PARAGRAPH,
    value: defaultDocComponentAttributes.value,
    attributes: {
        fontColor: colors.RED
    }
};

const extractYear = date => {
    const match = date.match(/\d{4}/);

    if (!match) return date;

    return match[0];
};

const createEducationTitle_ = ({ start, end, title, institution }) =>
    `${extractYear(start) ?? defaultDocComponentAttributes.value}/${
        extractYear(end) ?? defaultDocComponentAttributes.value
    } - ${title ?? defaultDocComponentAttributes.value} | ${
        institution ?? defaultDocComponentAttributes
    }`;

const createWorkExperienceTitle_ = ({
    company = null,
    address = null,
    start = null,
    end = null,
    title = null
}) =>
    `${company ?? defaultDocComponentAttributes.value}, ${
        address ?? defaultDocComponentAttributes.value
    } - Since ${extractYear(start) ?? defaultDocComponentAttributes.value} @ ${
        extractYear(end) ?? defaultDocComponentAttributes.value
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
        [DocumentApp.Attribute.FONT_FAMILY]: 'inter'
    });

    const headerComponent = {
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
    };

    const jobTitleComponent = {
        level: docHierarchyLevel.NEW_ROW,
        type: docComponentsType.PARAGRAPH,
        value: data.jobTitle,
        attributes: {
            fontSize: 22,
            headingStyle: docHeadingStyles.SUBTITLE,
            fontColor: colors.LIGHT_GRAY
        }
    };

    const profileDescriptionComponent = {
        level: docHierarchyLevel.NEW_ROW,
        type: docComponentsType.PARAGRAPH,
        value: data?.description
    };

    const skillsComponents =
        data?.skills.length > 0
            ? data.skills.map(skill => ({
                  level: docHierarchyLevel.NEW_ROW,
                  type: docComponentsType.PARAGRAPH,
                  value: skill
              }))
            : [defaultUnknownComponent];

    const educationComponents =
        data?.education.length > 0
            ? data.education.map(education => ({
                  level: docHierarchyLevel.NEW_ROW,
                  type: docComponentsType.PARAGRAPH,
                  value: createEducationTitle_(education),
                  attributes: { spacingBefore: 10 }
              }))
            : [defaultUnknownComponent];

    const languageComponents =
        data?.languages.length > 0
            ? data.languages.map(language => ({
                  level: docHierarchyLevel.NEW_ROW,
                  type: docComponentsType.PARAGRAPH,
                  value: language
              }))
            : [defaultUnknownComponent];

    const workExperienceComponents =
        data?.workExperience.length > 0
            ? data.workExperience.map(experience => ({
                  level: docHierarchyLevel.NEW_ROW,
                  type: docComponentsType.PARAGRAPH,
                  value: createWorkExperienceTitle_(experience),
                  attributes: {
                      bold: true,
                      spacingBefore: 10
                  },
                  children: experience?.description?.map(desc => ({
                      level: docHierarchyLevel.NEW_ROW,
                      type: docComponentsType.LIST_ITEM,
                      value: desc ?? defaultDocComponentAttributes.value
                  }))
              }))
            : [defaultUnknownComponent];

    const docStructure = [
        headerComponent,
        jobTitleComponent,
        docTitlesComponents.EDUCATION,
        ...educationComponents,
        docTitlesComponents.PROFILE,
        profileDescriptionComponent,
        docTitlesComponents.TECHNICAL_SKILLS,
        ...skillsComponents,
        docTitlesComponents.LANGUAGES,
        ...languageComponents,
        docTitlesComponents.PROJECTS,
        ...workExperienceComponents
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
        headingStyle: defaultHeadingStyle,
        noValueFontColor: defaultNoValueFontColor
    } = defaultDocComponentAttributes;

    const fontColor = value
        ? attributes?.fontColor ?? defaultFontColor
        : defaultNoValueFontColor;

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
            .setForegroundColor(fontColor)
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
            .setForegroundColor(fontColor)
            .setFontSize(attributes?.fontSize ?? defaultFontSize)
            .setBold(attributes?.bold ?? defaultBoldValue)
            .setGlyphType(attributes?.glyphType ?? defaultGlyphType);
    }

    return DocumentApp.getActiveDocument().getBody();
};
