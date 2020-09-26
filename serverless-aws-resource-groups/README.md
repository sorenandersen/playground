# demo-resource-group

Sample project demonstrating how to use AWS Resource Groups to automatically organize resources into groups, with auto-generated CloudWatch dashboards.

Inspired by the [AWS blog post 'Instantly monitor serverless applications with AWS Resource Groups'](https://aws.amazon.com/blogs/mt/instantly-monitor-serverless-applications-aws-resource-groups/) and ported to the Serverless Framework.

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy
```

## Test

```
curl -X PUT -H "Content-Type: application/json" -d '{"name": "foo"}' https://xyz.execute-api.us-east-1.amazonaws.com/beer -i

curl https://xyz.execute-api.us-east-1.amazonaws.com/beer/foo -i

# List group resources
aws resource-groups list-group-resources --group demo-resource-group-dev --region us-east-1
```

## Monitoring

Creating a resource group brings the added benefit of auto-generated CloudWatch dashboards for monitoring the application. The CloudWatch home page features a dropdown that defaults to "All resources". Select a resource group to see the generated dashboard.

[Dashboard link for the demo here](<https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=Home;filters=~(~(type~'ResourceGroup~params~'demo-resource-group-dev))>).

## References

- https://aws.amazon.com/blogs/mt/instantly-monitor-serverless-applications-aws-resource-groups/
