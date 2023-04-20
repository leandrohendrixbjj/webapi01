const keyModel = require('../model/keyModel');

async function all() {
    return keyModel.all()
}

async function create() {
    return keyModel.create();
}

module.exports = {
    all,
    create
}