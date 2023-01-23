const { v4 } = require('uuid');

global.users = [];

function findOne(id) {
    return global.users.find(item => item.id == id);
}

function all() {
    return global.users;
}

function store(user) {
    user.id = v4(); //v4 versão da uuid
    global.users.push(user);
    return user;
}

function update(id, user) {
    return global.users.forEach((item, index, array) => {
        if (item.id === id) {
            user.id = id;
            array[index] = user;
        }
    });
}

function remove(id) {
    return global.users.forEach((item, index, array) => {
        if (item.id == id)
            array.splice(index, 1)
    })
}

module.exports = {
    findOne,
    all,
    store,
    update,
    remove
}