#Create Cloud Function
gcloud functions deploy cv-automation \
    --trigger-http \
    --runtime=nodejs18 \
    --entry-point=app \
    --service-account=TODO \
    --region=$LOCATION \
    --no.allow-unauthenticated \
    --update-env-vars API_KEY=YOUR_API_KEY .