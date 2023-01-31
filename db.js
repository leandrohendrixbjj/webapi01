const { v4 } = require('uuid');
const fs = require('fs');
const FILE_PATH = require('path').join(__dirname, "users.json");

function all() {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync(FILE_PATH))
            resolve([])

        let rawData = fs.readFileSync(FILE_PATH)
        let users = JSON.parse(rawData)

        if (!Object.keys(users))
            resolve([])

        resolve(users)
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

async function update(id, user, overwrite = false) {
    const users = await all();
    return new Promise((resolve, reject) => {
        const index = users.findIndex(user => user.id == id);
        if (index === -1) resolve({})

        if (overwrite) {
            users[index] = user;
        } else {
            // Patch
            for (let row in users) {
                users[index][row] = user[row]
            }
        }
        fs.writeFileSync(FILE_PATH, JSON.stringify(users));
        resolve(users)
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        let users = require('./users.json');
        users.forEach((item, index, array) => {
            if (item.id == id)
                array.splice(index, 1)
        });
        if (findOne(id)) {
            fs.writeFileSync(FILE_PATH, JSON.stringify(users));
            resolve(true)
        }
        reject("Usuário não possui cadastro")
    });
}

module.exports = {
    findOne,
    all,
    store,
    update,
    remove
}