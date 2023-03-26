const { v4 } = require('uuid');
const fs = require('fs');
const { log } = require('console');
const FILE_PATH = require('path').join(__dirname, "keys.json");

function create(key) {
    return new Promise((resolve) => {
        let keys = require('./keys.json');
        const apikey = {
            key: v4(),
            enabled: true,
            lastUsed: null
        }
        keys.push(apikey);
        fs.writeFileSync(FILE_PATH, JSON.stringify(keys));
        resolve(apikey);
    });
}

function all() {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync(FILE_PATH))
            resolve([])

        let rawData = fs.readFileSync(FILE_PATH)
        let keys = JSON.parse(rawData)

        if (!Object.keys(keys))
            resolve([])

        resolve(keys)
    })
}

function findOne(key) {
    return new Promise((resolve, reject) => {
        let keys = require('./keys.json').find(item => item.key == key);

        if (!keys)
            resolve(false)

        resolve(keys)
    });
}

async function update(key, data) {
    const keys = await all();
    return new Promise((resolve, reject) => {
        const index = keys.findIndex(item => item.key == key);
        if (index === -1) reject(`Não achou a key ${key}`)

        keys.map((element, index, arr) => {
            if (element.key == key) {
                element.enabled = data.enabled
                element.lastUsed = data.lastUsed
            }
        })

        fs.writeFileSync(FILE_PATH, JSON.stringify(keys));
        resolve(keys)
    });
}

function remove(key) {
    return new Promise((resolve, reject) => {
        let keys = require('./keys.json');

        keys.forEach((item, index, array) => {
            if (item.key == key)
                array.splice(index, 1)
        });
        if (findOne(key)) {
            fs.writeFileSync(FILE_PATH, JSON.stringify(keys));
            resolve(true)
        }
        reject("Key não cadastrada")
    });
}

module.exports = {
    create,
    all,
    findOne,
    update,
    remove,
}