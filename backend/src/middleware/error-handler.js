module.exports = (error, _, res, next) => {
    console.log(error);

    const code = error.statusCode ?? 500;
    const message = error.statusCode
        ? error.message
        : 'Oops! Something went wrong';

    res.status(code).send({ code, message });

    return next();
};
