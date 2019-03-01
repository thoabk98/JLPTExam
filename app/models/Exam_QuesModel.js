'use strict'
const BaseModel = require('./base_model');
const knex = require('../utils/dbconnect');
const TABLE = "exam_ques";
class EQModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = EQModel;