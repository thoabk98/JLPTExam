'use strict'
const knex = require('../utils/dbconnect');
const BaseModel = require('./base_model');
const TABLE = "users"
class UserModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    getUser(email, password) {
        return new Promise((res, rej) => {
            knex('users').where({ 'email': email, 'password': password }).select('admin')
                .then((id) => {
                    res(id);
                })
        })
    }
}
module.exports = UserModel;
