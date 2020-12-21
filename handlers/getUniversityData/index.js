const CORSHeaders = require('./preFlightRequestHeaders');
const getUniData = require('../../dataUtils/getUniversityData');

exports.handler = async (event, context, callback) => {
    const { httpMethod } = event;

    if (httpMethod === 'OPTIONS') callback(null, CORSHeaders)

    try {
        const data = await getUniData();

        const response = {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'text/plain',
                "Access-Control-Allow-Origin": "http://the-ui.s3-website.eu-west-2.amazonaws.com",
                "Access-Control-Allow-Methods": "OPTIONS, GET"
            },
            statusCode: 200,
            isBase64Encoded: false
        };
    
        callback(null, response);
    } catch (error) { callback(error) }
};
