@echo Deploy IntimaUI to S3
aws --profile simonhutchison s3 sync "%~dp0.\build" s3://ui.intima.io --delete --acl public-read

@echo Clear Cloudfront cache - can take up to 5 minutes.
aws --profile simonhutchison cloudfront create-invalidation --distribution-id E11XPZ0UN1TLOZ --paths /*

pause