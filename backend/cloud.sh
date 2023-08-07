export PROJECT_ID=$(gcloud config list --format 'value(core.project)')

gcloud functions deploy cv-automation-api \
    --gen2 \
    --trigger-http \
    --runtime=nodejs18 \
    --entry-point=app \
    --service-account=doc-vertex-ai-cloud-function@$PROJECT_ID.iam.gserviceaccount.com \
    --region=europe-west2 \
    --no-allow-unauthenticated \
    --memory=512