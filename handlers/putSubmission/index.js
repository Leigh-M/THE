exports.handler = (event, context, callback) => {
    const response = {
        body: 'Some data successfuly put',
        headers: {
            'Content-Type': 'text/plain'
        },
        statusCode: 200
    };

    callback(null, JSON.stringify(response));
};
