const models = require("../models");

async function signUp(req, res) {
    try {
        const data = req.body;

        const options = {
            method: 'POST',
            uri: `${CONFIG.HOMELISTER_API_BASE_URL}auth/local`,
            body: {
                email: data.email,
                password: data.password
            },
            json: true
        }
        const loginResponse = await request(options)

        console.debug("\n---loginResponse-->", loginResponse);

        let hostData = await models.user.findOneAndUpdate(
            { email: data.email },
            { $set: data },
            { upsert: true, new: true, lean: true }
        );

        // save session in session table
        let session = {
            userId: hostData._id,
            deviceType: data.deviceType,
            deviceId: data.deviceId,
            deviceToken: data.deviceToken,
            deviceName: data.deviceName,
            appVersion: data.appVersion,
            timeOffset: data.timeOffset
        };
        if (data.voipToken) session.voipToken = data.voipToken;

        session = await models.session.findOneAndUpdate({
            deviceType: data.deviceType,
            deviceId: data.deviceId,
            // deviceToken: data.deviceToken
        }, {
                $set: session
            }, { upsert: true, new: true })
        // session = await new models.session(session).save();

        // console.log("------",session);

        // generate token
        hostData.token = universalFunctions.generateToken({
            sessionId: session._id,
        });

        // attach upcoming and past schedules
        // if (hostData.phone)
        hostData.tours = await tours({
            limit: 10,
            skip: 0,
            upcoming: true,
            id: hostData._id,
            past: true,
        });

        universalFunctions.sendSuccess(res, hostData);
    } catch (error) {
        console.log(error);
        // res.send(error);
        universalFunctions.sendError(res, error);
    }
}