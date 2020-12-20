exports.handler = (event, context, callback) => {
    try {
        (async () => {
            // ToDo
            console.log('Correctly ran getUniversityData')

            callback(null, 'Some data successfuly fetched');
        })();
    } catch (error) {
        callback(error);
    };
};
