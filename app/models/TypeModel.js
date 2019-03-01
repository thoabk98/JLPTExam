'use strict'
const BaseModel = require('./base_model');
const TABLE = "ques_type";
class TypeModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = TypeModel;