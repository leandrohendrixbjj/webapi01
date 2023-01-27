const { v4 } = require('uuid');
const fs = require('fs');
const FILE_PATH = require('path').join(__dirname, "users.json");

function all() {
    return new Promise((resolve, reject) => {
        let data = require('./users.json');

        if (Object.keys(data).length)
            resolve(require('./users.json'));

        reject("Arquivo vazio")
    });
}

function findOne(id) {
    return new Promise((resolve, reject) => {
        let users = require('./users.json').find(item => item.id == id);
        if (Object.keys(users).length)
            resolve(users)

        reject("Não achou o registro")
    });
}

function store(user) {
    return new Promise((resolve, reject) => {
        let users = require('./users.json');
        user.id = v4(); //v4 versão da uuid
        users.push(user);
        fs.writeFileSync(FILE_PATH, JSON.stringify(users));
        resolve(user);
    });
}

async function update(id, user) {
    return new Promise((resolve, reject) => {
        let users = require('./users.json');
        users.forEach((item, index, arr) => {
            if (item.id == id) {
                user.id = id
                arr[index] = user;
            }
        })
        fs.writeFileSync(FILE_PATH, JSON.stringify(users));
        resolve(user)
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