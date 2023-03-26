const keyModel = require('../model/keyModel')

module.exports = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    const dataExists = await keyModel.findOne(authorization)

    if (!dataExists)
        return res.sendStatus(401)

    if (dataExists.key && dataExists.enabled)
        return next()

}


