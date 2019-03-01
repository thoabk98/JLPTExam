'use strict'
const BaseModel = require('./base_model');
const knex = require('../utils/dbconnect');
const TABLE = "question";
class QuesModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    getQuesbyType(type, ofset) {
        return new Promise((res, rej) => {
            knex("ques_type").where({ "type": type }).select('idtype')
                .then(data => {
                    const id = data[0].idtype;
                    knex("question").where({ "idtype": id }).select('*')
                        .limit(10).offset(ofset)
                        .then(questions => res(questions));
                })
        })
    }

    getbyid(id) {
        return new Promise((res, rej) => {
            knex("question")
                .where({ "idtype": id }).select('idquestion', 'ques_content').orderBy('idquestion').limit(10)
                .then(result => res(result));
        })
    }
    next(id, idq) {
        return new Promise((res, rej) => {
            knex("question")
                .where({ "idtype": id }).select('idquestion', 'ques_content').andWhere('idquestion', '>', idq).orderBy('idquestion').limit(10)
                .then(result => {
                    res(result)
                });
        })
    }
    prev(id, idq) {
        return new Promise((res, rej) => {
            knex("question")
                .where({ "idtype": id }).select('idquestion', 'ques_content').andWhere('idquestion', '<', idq).orderBy('idquestion').limit(10)
                .then(result => {
                    res(result)
                });
        })
    }
    getQ(id) {
        return new Promise((res, rej) => {
            knex("question")
                .innerJoin("ques_ans", "question.idquestion", "ques_ans.idquestion")
                .innerJoin("answer", "answer.idanswer", "ques_ans.idanswer")
                .where({ "question.idquestion": id }).select('question.idquestion', 'question.ques_content', 'answer.ans_content', 'answer.idanswer', 'question.mp3', 'question.images')
                .columns(["question.ques_content", "answer.ans_content"])
                .then(result => res(result));
        })
    }

    sum(id) {
        return new Promise((res, rej) => {
            knex("question").where(id).count('idquestion')
                .then(num => res(num))
        })
    }

}

module.exports = QuesModel;