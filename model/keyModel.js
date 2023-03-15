const { v4 } = require('uuid');
const fs = require('fs');
const { json } = require('body-parser');
const { resolve } = require('path');
const FILE_PATH = require('path').join(__dirname, "keys.json");

function findOne(key) {
    return new Promise((resolve, reject) => {
        let keys = require('./keys.json').find(item => item.id == key);
        if (Object.keys(keys).length)
            resolve(keys)

        reject(`Não achou a key ${key}`)
    });
}

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

function remove(key) {
    return new Promise((resolve, reject) => {
        let keys = require('./keys.json');
        keys.forEach((item, index, array) => {
            if (item.id == id)
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
    findOne,
    create,
    remove
}