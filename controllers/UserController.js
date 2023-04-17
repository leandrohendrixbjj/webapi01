const userModel = require('../model/userModel.js');

async function getUsers() {
    return await userModel.all();
}

async function findOne(id) {
    return await userModel.findOne(id);
}

async function store(data) {
    return await userModel.store(data);
}

async function update(id, data) {
    return await userModel.update(id, data)
}

async function remove(id) {
    return await userModel.remove(id)
}


module.exports = {
    getUsers,
    findOne,
    store,
    update,
    remove
}