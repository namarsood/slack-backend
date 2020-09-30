const boom = require("@hapi/boom");
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');


const sanitizeJoiError = function (error) {
    let customErrorMessage = '';
    if (error.indexOf('[') > -1) {
        customErrorMessage = error.substr(error.indexOf('['));
    } else {
        customErrorMessage = error;
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    return customErrorMessage;
};

function generateToken(data) {
    data.date = new Date();
    return jwt.sign(data, "sUPerSeCuREKeY&^$^&$^%$^%7782348723t4872t34Ends");
}

function sendSuccess(res, data, message, statusCode) {
    const response = {
        data: data || {},
        statusCode: statusCode || 200,
        message: message || "SUCCESS"
    };
    res.status(response.statusCode).send(response);
}

function validateSchema(req, res, next, schema) {
    const { value, error } = Joi.validate(req.body, schema);
    const valid = error == null;
    if (valid) {
        req.body = value;
        next();
    } else {
        const e = boom.badRequest(sanitizeJoiError(error.message)).output.payload;
        res.status(e.statusCode).send(e);
    }
}
function validateHeaderSchema(req, res, schema) {
    const { value, error } = Joi.validate(req.headers, schema);
    const valid = error == null;
    if (!valid) {
        const e = boom.badRequest(sanitizeJoiError(error.message)).output.payload;
        res.status(e.statusCode).send(e);
    }
    return;
}

function sendError(res, error) {
    //  console.log(error);
    let errorObj = {
        error: (error && (error.error && (error.error.message || error.error))) || "Bad Request",
        statusCode: (error && error.statusCode) || 400,
        message: (error && ((error.error && error.error.message) || error.message)) || "Bad Request"
    };
    if (error.isBoom) {
        errorObj = error.output.payload;
    }
    else if (error.name == "JsonWebTokenError") {
        errorObj.error = "JsonWebTokenError";
    }
    res.status(errorObj.statusCode).send(errorObj);
}



module.exports = {
    sanitizeJoiError,
    generateToken,
    sendSuccess,
    validateSchema,
    validateHeaderSchema,
    sendError
}