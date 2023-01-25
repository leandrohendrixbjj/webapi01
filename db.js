const { v4 } = require('uuid');

global.users = [];

function findOne(id) {
    return new Promise((resolve, reject) => {
        let user = global.users.find(item => item.id == id);
        resolve(user)
    });
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

async function update(id, user) {
    return new Promise((resolve, reject) => {
        global.users.forEach((item, index, array) => {
            if (item.id === id) {
                user.id = id;
                array[index] = user;
            }
        });
        let data = findOne(id)
        resolve(data)
    });

}

function remove(id) {
    return new Promise((resolve, reject) => {
        global.users.forEach((item, index, array) => {
            if (item.id == id)
                array.splice(index, 1)
        });
        resolve(true)
    });
}

module.exports = {
    findOne,
    all,
    store,
    update,
    remove
}