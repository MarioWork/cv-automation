module.exports = messages => ({
    context: `Translate the following data into English and return it as a JSON object string, with the data organized and formatted as follows:

    json
    {
    "name": null,
    "jobTitle": null,
    "description": null,
    "skills": [],
    "languages": [],
    "education": [
    {
    "start": null,
    "end": null,
    "title": null,
    "description": [],
    "institution": null,
    "address": null
    }
    ],
    "workExperience": [
    {
    "start": null,
    "end": null,
    "title": null,
    "description": [],
    "company": null,
    "address": null
    }
    ]
    }

    Do not use unnecessary line breaks and whitespace`,
    examples: [],
    messages: messages
});
