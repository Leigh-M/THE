const swaggerDoc = {
    swagger: '2.0',
    info: {
        version: '1.0',
        title: 'THESwaggerDoc'
    },
    host: '7a1py9yg34.execute-api.eu-west-2.amazonaws.com',
    basePath: '/v1',
    paths: {
        '/': {
            get: {
                responses: {
                    "200": {
                        "description": "Success"
                    }
                },
                "operationId": "getSwagger",
                "tags": [
                    "default"
                ]
            }
        },
        '/get-university-data': {
            get: {
                responses: {
                    "200": {
                        "description": "Success"
                    }
                },
                "operationId": "getUniversityData",
                "tags": [
                    "default"
                ]
            }
        },
        '/put-university': {
            put: {
                responses: {
                    "200": {
                        "description": "Success"
                    }
                },
                "operationId": "putUniversity",
                "tags": [
                    "default"
                ]
            }
        },
        '/put-submission': {
            put: {
                responses: {
                    "200": {
                        "description": "Success"
                    }
                },
                "operationId": "putSubmission",
                "tags": [
                    "default"
                ]
            }
        }
    }
};

module.exports = swaggerDoc;
