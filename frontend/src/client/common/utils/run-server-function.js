/**
 *  Executes a google apps script server function by name and return promise
 * @param {{functionName: string, data: *}} params
 * @returns
 */
exports.runServerFunction = ({ functionName, data }) =>
    new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler(data => resolve(data))
            .withFailureHandler(err => reject(err))
            [functionName](data);
    });
