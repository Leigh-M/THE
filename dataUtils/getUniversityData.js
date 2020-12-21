process.env.AWS_SDK_LOAD_CONFIG = 2;
const AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName : 'THE-Universities',
    Key: {
      institutionId: '100',
      year: 2000
    }
};

module.exports = async () => {
    try {
        return await docClient.get(params).promise();
    } catch (err) { console.log(err) };
};
