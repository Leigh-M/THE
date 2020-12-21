const swaggerDoc = require('./swaggerDoc');
const CORSHeaders = require('./preFlightRequestHeaders');

exports.handler = (event, context, callback) => {
    const { httpMethod } = event;

    if (httpMethod === 'OPTIONS') callback(null, CORSHeaders)

    const response = {
        body: JSON.stringify(swaggerDoc),
        headers: {
            'Content-Type': 'text/plain',
            "Access-Control-Allow-Origin": "http://the-ui.s3-website.eu-west-2.amazonaws.com",
            "Access-Control-Allow-Methods": "OPTIONS, GET"
        },
        statusCode: 200,
        isBase64Encoded: false
    };

    callback(null, response);
};
