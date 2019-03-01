'use strict'
const BaseModel = require('./base_model');
const knex = require('../utils/dbconnect');
const TABLE = "ques_ans";
class Ques_AnsModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    addQues(data) {
        return new Promise((resolve, reject) => {
            knex(this.tableName).returning('score').insert(data)
                .then(res => resolve(res))
                .catch(err => reject(err));
        })
    }
    getByIds(ids) {
        return new Promise((resolve, reject) => {
            knex("ques_ans").whereIn('idquestion', ids).andWhere('check', 1).select('*')
                .then(res => resolve(res))
                .catch(err => reject(err));
        })
    }

}
module.exports = Ques_AnsModel;