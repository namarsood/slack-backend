module.exports = function (app) {
    const Joi = require("joi");
    const controller = require("../controllers/workplace.js");
    const universalFunctions = require("../universal-functions");
    // Routes

    /**
     * @swagger
     * /v1/workplace:
     *  post:
     *     tags:
     *       - workplace
     *     description: To add workplace
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: name
     *         description: name of the workplace.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: description
     *         description: description of the workplace.
     *         in: formData
     *         required: false
     *         type: string
     *       - name: logo
     *         description: url of the workplace image.
     *         in: formData
     *         required: false
     *         type: string
     *     responses:
     *      '200':
     *       description: A successful response
     */
    app.post(
        "/v1/workplace",
        (req, res, next) => {
            const schema = Joi.object().keys({
                name: Joi.string(),
                description: Joi.string(),
                logo: Joi.string().trim(),
            });
            universalFunctions.validateSchema(req, res, next, schema);
        },
        controller.addWorkplace
    );
}