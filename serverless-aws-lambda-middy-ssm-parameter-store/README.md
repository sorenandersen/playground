# Serverless/AWS/Lambda configuration: Set up values that can be changed on the fly

Sample project showing how to use SSM Parameter Store for dynamic configuration.

This example uses the Serverless Framework along with the awesome `middy` package.

## Manual setup

Create a new parameter in the AWS Systems Manager >> Parameter Store console:
https://console.aws.amazon.com/systems-manager/parameters:

- In the _name_ field enter `/demo-lambda-middy-ssm-param/dev/index/config`.
- _Data type_: text

Finally as the _value_ paste in the following JSON object:

```
{
  "someProp": "Value configurable in Parameter Store and applied dynamically via middy middleware."
}
```

## Geting started

```
# Install dependencies
npm install

# Deploy the stack
npm run sls -- deploy
```

## Test

Open the index URL in a browser (https://something.execute-api.us-east-1.amazonaws.com/). See that the value of the `configurable` property equals what was put into the AWS console when we created the parameter.

Now go back to the AWS Systems Manager >> Parameter Store console and change the value of `someProp`.

When the configured cache time (here, 1 minute) has passed, the new value will be returned by the endpoint. The caching of course prevents the function from reading from the parameter store on every invocation.

## SSM Parameter Store throughput limit

When using SSM Parameter Store's default low limit of 40 ops/second the service is free. To increases throughput go to the Paramter Store console, select the Settings tab and click "Set limit".
