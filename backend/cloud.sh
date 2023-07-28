export PROJECT_ID=$(gcloud config list --format 'value(core.project)')

gcloud functions deploy cv-automation-api \
    --trigger-http \
    --runtime=nodejs18 \
    --entry-point=app \
    --service-account=datastore-read-function@$PROJECT_ID.iam.gserviceaccount.com \
    --region=europe-west4 \
    --no-allow-unauthenticated \