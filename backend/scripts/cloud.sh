export PROJECT_ID=$(gcloud config list --format 'value(core.project)');
export PROJECT_NR=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)');
export LOCATION="us-central1";

gcloud functions deploy cv-automation-api \
    --gen2 \
    --trigger-http \
    --runtime=nodejs18 \
    --entry-point=app \
    --service-account=doc-vertex-ai-cloud-function@$PROJECT_ID.iam.gserviceaccount.com \
    --region=europe-west2 \
    --no-allow-unauthenticated \
    --memory=512 \
    --set-env-vars VERTEX_AI_TEXT_ENDPOINT="projects/$PROJECT_ID/locations/$LOCATION/publishers/google/models/chat-bison",DOC_AI_PROCESSOR_ENDPOINT="projects/$PROJECT_NR/locations/eu/processors/b910bbfdea5937b4",GC_PROJECT_ID=$PROJECT_ID
