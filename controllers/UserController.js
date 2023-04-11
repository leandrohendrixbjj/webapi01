const db = require('../model/userModel.js');

async function getUsers() {
    return await db.all();
}

module.exports = {
    getUsers
}