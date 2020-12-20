## THE tech puzzle - Solution
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

  Frontend tasks completed:
    - Display some submission data per institution for each year in either a table or chart

Please see /architecture folder for overview of architecture (.png format saved, however original draw.io files included. View/ edit originals via web interface or free desktop download at draw.io)

There is a production grade solution architecture, and this repo contains a more simple (rapid prototype) version just for sample code, approach and style.

This solution is currently deployed however is provisioned with SAM/ (CloudFormation) and is now portable, please find instructions how to provision this on THE or personal AWS accounts below, please feel free to re-use any code if required in future projects! :-)

### Also please review template.yaml
This should give the best overview of the resources provisioned by the API, routes exposed and lambdas (purely proxy lambdas currently, ie no integrity checking or manipulation of data in/ out of the lambda by API Gateway) backing those routes

The endpoints exposed in this deployment so you can navigate to those directly are below:

Swagger documentation placed at the root:
https://rsmopi0xmg.execute-api.eu-west-2.amazonaws.com/v1

Fetch all data:
https://rsmopi0xmg.execute-api.eu-west-2.amazonaws.com/v1/get-university-data

Reset data to original:
https://rsmopi0xmg.execute-api.eu-west-2.amazonaws.com/reset-data

Upload data:
https://rsmopi0xmg.execute-api.eu-west-2.amazonaws.com/upload-university-data

Or for API access or curl for example:
  `$ curl --request GET https://rsmopi0xmg.execute-api.eu-west-2.amazonaws.com/v1`

### To run unit tests, lint and check unit test coverage
`npm run test`
`npm run lint`
`npm run coverage`

### If you would like to deploy your own version of this API to AWS:
#### Prerequisites:
An AWS account and S3 bucket (for data and bundled artifacts) N.b S3 bucket names need to be globally unique.
aws-cli installed

Optionally: AWS SAM cli (https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html)
(SAM -> shorthand; AWS CloudFormation longhand)

#### To Deploy:
Clone the repo: `git clone https://github.com/Leigh-M/THE.git`

`npm i`
`npm run build`

If SAM not installed:
`aws cloudformation package --s3-bucket {your-zipped-artifacts-unique-s3-bucket} --template template.yaml --output-template-file templateOut.yaml`

`aws cloudformation deploy --template-file templateOut.yaml --stack-name {your-stack-name} --capabilities CAPABILITY_IAM --region eu-west-2`

With SAM is installed you may:
`SAM package`
`SAM deploy`

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
`sam local invoke getRadialResidents -t templateLocal.yaml --no-event -d 5858`

Then press F5

Remove -d flag to run without debugging

You may optionally include additional flag: `--skip-pull-image` to speed up docker loading post-initial pull of image:
`sam local invoke getRadialResidents -t templateLocal.yaml --no-event -d 5858 --skip-pull-image`

### ToDos
Given more time would like to do:

Build in TS (Rapid prototyping (at my TS experience level) more efficiently done in JS/ nodeJs)
Add more unit tests - an example of style can be seen though
Improve error handling to guard against unexpected responses, network or transient errors
Add documentation/ param & return type hints on functions - jsDocs (although TS would solve much of that)
Expand routes with dynamic requests/ stage variables
Consider integration and end-to-end tests

### Comments
Usually comments should be kept to a minimum but still used where appropriate, in favour of clear naming conventions and clarity in code/ composition of software, as per 'Clean Code' book, but I have included more here than usual to explain approach

Thank you for reviewing - any suggestions on improvements gratefully received!