'use strict'
const BaseModel = require('./base_model');
const knex = require('../utils/dbconnect');
const TABLE = "answer";
class AnsModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = AnsModel;