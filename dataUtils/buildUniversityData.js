process.env.AWS_SDK_LOAD_CONFIG = 2;
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const putParams = {
    TableName: 'THE-Universities',
    Item: {
        institutionId: 'some Id',
        year: 2000
     }
};

(async () => {
    try { await docClient.put(putParams).promise() } catch (error) { console.log(err) };
})();
