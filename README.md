## THE tech puzzle
### The task, optionally:
  Look at the data and see how it could be enhanced or what insights could be gained from it:
  - Produce a list of the best institutions to study a particular subject
  - Enhance the data by adding some new data e.g. adding how many [Covid-19 cases](https://github.com/nytimes/covid-19-data) there have been per country/institution (N.B. as our dataset names are made up, feel free to amend them to show it working)

  Show us how you could setup a service to manage this sort of data:
  - Create an API that would be able to serve the data to a frontend to render
  - Setup storage mechanism to store the data and allow for adding new data (rather than using static JSON files)

  Display and interact the data:
  - Display some submission data per institution for each year in either a table or chart
  - Show a list of subjects and which institutions you can study them at

### Tasks completed as part of this exercise:
  Backend tasks completed:
  - Create an API that would be able to serve the data to a frontend to render
  - Setup storage mechanism to store the data and allow for adding new data (rather than using static JSON files)

  - also: reset table data to original structure

  Frontend tasks completed:
    - Display some submission data per institution for each year in either a table or chart (React app with tabular view)

Please see /architecture folder for overview of solutions (.png format saved, however original draw.io files included. You may view/ edit originals via web interface or desktop (free) download at draw.io)

There is a production grade solution architecture, and this repo contains a more simple (rapid prototype) version to demonstrate sample code, approach and style.

This solution is currently deployed on my personal AWS account, however as it was provisioned via SAM/ (CloudFormation - infrastructure as Code (IaC)) it is now fully portable & re-usable/ re-deployable to any AWS account. Please find instructions how to provision this on THE or your personal AWS accounts below. Please feel free to re-use any code you may like if required in future projects

### Also please review the template.yaml
This should give an easy overview of the resources provisioned including API Gateway routes exposed, lambdas (purely proxy lambdas currently, ie no integrity checking or manipulation of data in/ out of the lambda by API Gateway) backing those routes and DynamoDB table/ indexes provisioned

Just for ease, the endpoints exposed in this deployment so you can navigate to those directly are below:

Swagger documentation placed at the root:
https://5bu98i38l9.execute-api.eu-west-2.amazonaws.com/v1

Fetch all university data:
https://5bu98i38l9.execute-api.eu-west-2.amazonaws.com/v1/get-university-data

Put new university:
https://5bu98i38l9.execute-api.eu-west-2.amazonaws.com/put-university

Put new submission:
https://5bu98i38l9.execute-api.eu-west-2.amazonaws.com/put-submission

Or for external API access or curl for example: `$ curl --request GET https://rsmopi0xmg.execute-api.eu-west-2.amazonaws.com/v1`

### To run unit tests, lint and check unit test coverage
`npm run test`
`npm run lint`
`npm run coverage`

### If you would like to deploy your own version of this API to AWS:
#### Prerequisites:
An AWS account and S3 bucket (for data and bundled artifacts) N.b S3 bucket names need to be globally unique.
aws-cli installed

Optionally: AWS SAM cli (https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html)
(SAM cli provides better CLI feedback and enables local invocation of lambdas for development & testing. AWS CloudFormation is required for EC2/ server based IaC)

#### To Deploy:
Clone the repo: `git clone https://github.com/Leigh-M/THE.git`

`npm i`
`npm run build`

With SAM installed:
`sam package --s3-bucket {your-zipped-artifacts-unique-s3-bucket} --template template.yaml --output-template-file templateOut.yaml`
`sam deploy --template-file templateOut.yaml --stack-name {your-stack-name} --capabilities CAPABILITY_NAMED_IAM --region eu-west-2`

If SAM not installed:
`aws cloudformation package --s3-bucket {your-zipped-artifacts-unique-s3-bucket} --template template.yaml --output-template-file templateOut.yaml`
`aws cloudformation deploy --template-file templateOut.yaml --stack-name {your-stack-name} --capabilities CAPABILITY_NAMED_IAM --region eu-west-2`

Webpack bundles the dependencies (toDo: spike to investigate webpack tree-shaking to ensure minimal dependencies installed)

The provisioned endpoints/ URI should now be available for you to see within the Stages section of AWS API Gateway

### CI/CD pipeline included
As an example included is a Gitlab .yml file which runs unit tests and linting on each commit, aside from WIP commits

### To debug locally
VSCode launch config:

```JavaScript
{
    "name": "Attach to SAM src",
    "type": "node",
    "request": "attach",
    "address": "localhost",
    "port": 5858,
    "localRoot": "${workspaceRoot}",
    "remoteRoot": "/var/task",
    "protocol": "inspector",
    // "stopOnEntry": false,
    "skipFiles": [
    "<node_internals>/**/*.js", "node_modules", "**/**/runtime/index.js",
    ]
}
```
Usage: add breakpoint then:
`sam local invoke getSwaggerDoc -t templateLocal.yaml --no-event -d 5858`

Then press F5

Remove -d flag to run locally without debugging
N.b local lambdas still interact with AWS services in the Cloud

### ToDos
I ran out of time unfortunately after provisioing infrastructure in SAM Template format, fairly detailed docs (readme) and 2 architecture diags - hopefully this shows approach and attention to detail, but I agree does not demonstrate code data and especially data model to efficiently interact with the data - my first goto place is usually DynamoDB (purely from experience with it) most things can be done in a single table (and replication of data) however in this case I would probably rethink and go for RDS (with Universities table and Subscriptions table) I have experience in Oracle mostly (although most SQL based DBs are similar) so OracleDB driver (I posted a solution on stackoverflow for correct setup process it can be a bit fiddly first time) - so although I have (I hope!) demonstrated knowledge on AWS/ Archtecture will be some areas we'd need to cover in more detail I suspect (eg TDD style etc - but I do have some sample code for that) modularization (I always maintain correct abstraction layers and try not to mix (eg: modularize some code but not others areas) that can be when it looks slightly unfinished to me)

Build in TS (Rapid prototyping (at my TS experience level) more efficiently done in JS/ nodeJs)
Add more unit tests - an example of style can be seen though
Add error handling to guard against unexpected responses, network or transient errors
Add documentation/ param & return type hints on functions - jsDocs (although TS would solve much of that)
Expand routes with dynamic requests/ stage variables
Consider integration and end-to-end tests

### Comments
Usually comments should be kept to a minimum but still used where appropriate, in favour of clear naming conventions and clarity in code/ composition of software, as per 'Clean Code' book, but I have included more here than usual to explain approach

Thank you for reviewing - suggestions on improvements gratefully received!
