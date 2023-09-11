exports.runServerFunction = ({ functionName, data }) =>
    new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler(data => resolve(data))
            .withFailureHandler(err => reject(err))
            [functionName](data);
    });
