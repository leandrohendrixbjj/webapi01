const userSchema = require('../model/userSchema.js');

function validate(req, res, next) {
    const { error } = userSchema.validate(req.body)

    if (error)
        res.status(422).json({ error })
    next();
}

module.exports = validate;