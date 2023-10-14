/**
 * Google Docs components names
 */
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

/**
 * Default attributes used for components attributes when they are undefined
 */
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

/**
 * Google docs heading styles
 */
const docHeadingStyles = {
    TITLE: DocumentApp.ParagraphHeading.TITLE,
    SUBTITLE: DocumentApp.ParagraphHeading.SUBTITLE,
    NORMAL: DocumentApp.ParagraphHeading.NORMAL,
    HEADING1: DocumentApp.ParagraphHeading.HEADING1,
    HEADING2: DocumentApp.ParagraphHeading.HEADING2
};

/**
 * Hierarchy levels to let the algorithm know where the component will be placed
 * 0 = Right the beginning of the document ( When the algorithm starts )
 * 1 = Component in a new Document Row
 * 2 = Component will be placed as a child of the parent component
 * in the document structure we create
 */
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

/**
 * A default component for when data is missing or something went wrong with the component data
 */
const defaultUnknownComponent = {
    level: docHierarchyLevel.NEW_ROW,
    type: docComponentsType.PARAGRAPH,
    value: defaultDocComponentAttributes.value,
    attributes: {
        fontColor: colors.RED
    }
};

/**
 * Returns a 4digit string if it finds a 4 digit in the date string
 * otherwise returns the original date string
 * @param {string} date
 * @returns {string}
 */
const extractYear = date => {
    const match = date?.match(/\d{4}/);

    if (!match) return date;

    return match[0];
};

/**
 *  Creates a education component title with the given data
 * @param {{start: string=, end: string=, title: string=, institution: string=}} params
 * @returns {string} final title
 */
const createEducationTitle_ = ({ start, end, title, institution }) =>
    `${extractYear(start) ?? defaultDocComponentAttributes.value}/${
        extractYear(end) ?? defaultDocComponentAttributes.value
    } - ${title ?? defaultDocComponentAttributes.value} | ${
        institution ?? defaultDocComponentAttributes
    }`;

/**
 *  Creates a work experience component title with the given data
 * @param {{company: string=, address: string=, start: string=, end: string=, title: string=}} params
 * @returns {string} final title
 */
const createWorkExperienceTitle_ = ({ company, address, start, end, title }) =>
    `${company ?? defaultDocComponentAttributes.value}, ${
        address ?? defaultDocComponentAttributes.value
    } - Since ${extractYear(start) ?? defaultDocComponentAttributes.value} @ ${
        extractYear(end) ?? defaultDocComponentAttributes.value
    } ${title ?? defaultDocComponentAttributes.value}`;

/**
 * If possible splits the name and returns a string with first and last name
 * @param {string} name
 * @returns {string} transformed name
 */
const createCandidateName_ = name => {
    const splittedCandidateName = name ? name.split(' ') : null;

    return splittedCandidateName
        ? splittedCandidateName[0] +
              ' ' +
              splittedCandidateName[splittedCandidateName.length - 1]
        : null;
};

/**
 * Document row counter
 */
let docIndex = 0;

//TODO: Add page numbers
//TODO: Add logo on top of header after first page
/**
 * Creates the google docs document with the given data
 * @param {*} data data object interpreted by A.I
 */
const createDocumentStructureService_ = data => {
    const candidateName = createCandidateName_(data.name);

    const docBody = DocumentApp.getActiveDocument().getBody();
    docBody.setAttributes({
        [DocumentApp.Attribute.FONT_FAMILY]: 'Inter'
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

    /**
     * If there is not skills/education/WorkExperience found
     * uses the default unknown value component
     */
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

    //Array of doc components used to create document structure
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

/**
 * Creates google docs components using the document
 * structure we created recursively depending on the component children
 * @param {{parent: *=, children: *[], level: string=}} param0
 */
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

/**
 * Creates the google docs component with the given data
 * @param {{parent: *, componentType: docComponentsType, value: string=, attributes: *. level: string?}}
 * @returns component created
 */
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

    /**
     * if value is missing give it no value color
     * if the font color is not declared in the attributes give it a default color
     */
    const fontColor = value
        ? attributes?.fontColor ?? defaultFontColor
        : defaultNoValueFontColor;

    /** Every time the component level is not a ROW_CHILD
     * the parent of the component should be the body of the document */
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
