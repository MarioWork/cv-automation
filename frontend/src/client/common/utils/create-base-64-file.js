/**
 * Returns a promise that when resolved returns the 64 string encoded file
 * @param {File} file
 * @returns {Promise}
 */
exports.createBase64File = file =>
    new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });
