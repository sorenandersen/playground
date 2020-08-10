# Serverless/AWS/DynamoDB: Deploy seed data with a Node script

Sample project showing how to populate a DynamoDB table with seed data.

This example uses the Serverless Framework along with the `serverless-export-env` plugin. The `TABLE_NAME` variable is exported to `.env` and later read by the Node script when inserting the seed data.

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy

# Export environment variables to .env
npm run export-env

# Deploy seed data
node deploy-seed-data.js

# Verify
aws dynamodb scan \
  --region us-east-1 \
  --table-name $(grep -m 1 TABLE_NAME .env | awk -F= '{print $2}')
```
