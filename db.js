const { v4 } = require('uuid');

global.users = [];

function findOne(id) {
    return global.users.find(item => item.id == id);
}

function all() {
    return new Promise((resolve, reject) => {
        resolve(global.users);
    });
}

function store(user) {
    return new Promise((resolve, reject) => {
        user.id = v4(); //v4 versão da uuid
        global.users.push(user);
        resolve(user);
    });
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