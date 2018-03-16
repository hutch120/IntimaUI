@echo Deploy IntimaUI to S3
aws --profile simonhutchison s3 sync "%~dp0.\build" s3://ui.intima.io --delete --acl public-read

@rem @echo Clear Cloudfront cache - can take up to 5 minutes.
@rem aws --profile simonhutchison cloudfront create-invalidation --distribution-id E2VRQX3Q898A6V --paths /*

pause