const swaggerDoc = require('./swaggerDoc');

exports.handler = (event, context, callback) => {
    console.log(`Successfully fetched swagger doc: ${JSON.stringify(swaggerDoc, null, 1)}`);

    const response = {
        body: JSON.stringify(swaggerDoc),
        headers: {
            'Content-Type': 'text/plain'
        },
        statusCode: 200
    };

    callback(null, response);
};
