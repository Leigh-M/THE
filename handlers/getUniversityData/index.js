exports.handler = (event, context, callback) => {
    console.log('Correctly ran getUniversityData');

    const response = {
        body: JSON.stringify('Some data successfuly fetched'),
        headers: {
            'Content-Type': 'text/plain'
        },
        statusCode: 200,
        isBase64Encoded: false
    };

    callback(null, response);
};
