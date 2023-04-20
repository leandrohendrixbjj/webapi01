const keyModel = require('../model/keyModel');

async function all() {
    return keyModel.all()
}

module.exports = {
    all
}