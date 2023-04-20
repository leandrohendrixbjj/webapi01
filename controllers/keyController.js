const keyModel = require('../model/keyModel');

async function all() {
    return keyModel.all()
}

async function create() {
    return keyModel.create()
}

async function findOne(key) {
    return keyModel.findOne(key)
}

async function update(key, data) {
    return keyModel.update(key, data)
}

module.exports = {
    all,
    create,
    findOne,
    update
}