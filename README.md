# CV Automation

## Objective

Automatize the conversion of the candidate curriculum into a company internal curriculum and enhance it, using generative A.I.

## Coding formatting rules used

- Eslint Recommended
- Single Quotes
- Avoid Parentheses on functions with one parameter
- Tab width of 4
- No trailing commas,
- No console logs
- No unused variables

## To run backend in development

- Create a `.env` file with the `.env.example` structure
- `cd backend && npm i && npm run dev`

(There is a json file called `CV_Automation.postman_collection.json` with the endpoints requests already created)

## To deploy backend

- Install [gcloud](https://cloud.google.com/sdk/docs/install) cli tools

- `gcloud auth login`

- Set the current project by running the following command `gcloud config set project <Your-Project-Name>`

- `npm run deploy` to deploy to Google Cloud Functions

- Executes a file in the `scripts` directory called
  `cloud.sh` that automatically deploys the backend

- Make sure your user has permissions necessary in the project

## To run frontend in development

- Create a `.clasp.json`file inside `frontend`directory with the structure of the `.clasp.example.json`

- `cd frontend && npm i`

- `npm run glogin`

- `npm run glogin`

- `npm run dev`

## To deploy frontend

- Go to the script in [Google Apps Script](https://script.google.com/u/1/home/start)

- Click `deploy` and deploy a new version

- Go to Google Cloud Project `Google Marketplace API` and increment the addon version

## Technologies

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Vue.js 3](https://vuejs.org/)
- [Parcel.js](https://parceljs.org/)
- [Google Cloud](https://cloud.google.com/?hl=en)
- [Google Apps Script](https://www.google.com/script/start/)
- [Google Vertex A.I Bison Models](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/overview)
- [Google Document A.I](https://cloud.google.com/document-ai?hl=en)

## Useful Resources

- [Google Apps Script](https://developers.google.com/apps-script)
- [Deploy Google Apps Script (Video)](https://www.youtube.com/watch?v=6jcc3xm7aRU)
