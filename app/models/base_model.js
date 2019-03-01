'use strict'
const db = require('../utils/dbconnect');
class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            db(this.tableName).where(id).select('*')
                .then(res => resolve(res[0]))
                .catch(err => reject(err));
        })
    }
    getAll() {
        return new Promise((resolve, reject) => {
            db(this.tableName).select('*')
                .then(res => resolve(res))
                .catch(err => reject(err));
        })
    }
    add(data) {
        return new Promise((resolve, reject) => {
            db(this.tableName).returning('id').insert(data)
                .then(res => resolve(res))
                .catch(err => reject(err));
        })
    }
    update(data, id) {
        return new Promise((resolve, reject) => {
            db(this.tableName).where(id).update(data)
                .then(res => resolve(res))
                .catch(err => reject(err));
        })
    }
    del(id) {
        return new Promise((resolve, reject) => {
            db(this.tableName).where(id).del()
                .then(res => {
                    resolve(res)
                })
                .catch(err => reject(err));
        })
    }
    count() {
        return new Promise((resolve, reject) => {
            db(this.tableName).count('id')
                .then(res => resolve(res[0]['count(`id`)']))
                .catch(err => reject(err));
        })
    }
}
module.exports = BaseModel;