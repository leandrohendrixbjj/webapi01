const keyModel = require('../model/keyModel')

module.exports = (req, res, next) => {
    const key = req.headers['authorization'];
    const apikey = keyModel.findOne(key.replace('ApiKey', ''))

    if (apikey && apikey.enabled)
        return next()

    return res.sendStatus(401)
}


