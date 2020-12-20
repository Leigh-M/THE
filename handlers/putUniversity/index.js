exports.handler = (event, context, callback) => {
    try {
        (async () => {
            // ToDo
            console.log('Correctly ran putUniversity')

            callback(null, 'Some data successfuly put');
        })();
    } catch (error) {
        callback(error);
    };
};
