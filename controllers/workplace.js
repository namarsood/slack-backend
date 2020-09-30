const models = require("../models");
const universalFunctions = require("../universal-functions");

async function addWorkplace(req, res) {
    try {
        const data = req.body;
        const workplace = await new models.workplace(data).save();
        universalFunctions.sendSuccess(res, workplace);
    } catch (error) {
        universalFunctions.sendError(res, error);
    }
}

module.exports = {
    addWorkplace
};