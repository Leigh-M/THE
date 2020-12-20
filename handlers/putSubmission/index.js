exports.handler = (event, context, callback) => {
    try {
        (async () => {
            // ToDo
            console.log('Correctly ran putSubmission')

            callback(null, 'Some data successfuly put');
        })();
    } catch (error) {
        callback(error);
    };
};
