const models = require("../models");

async function addWorkplace(req, res) {
    try {
        console.log("add workplace");
        universalFunctions.sendSuccess(res, {});
    } catch (error) {
        universalFunctions.sendError(res, error);
    }
}

module.exports = {
    addWorkplace
};