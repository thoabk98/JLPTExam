'use strict'
const knex = require('../utils/dbconnect');
const BaseModel = require('./base_model');
const QuesModel = require('./QuesModel');
const d3 = require('d3-collection');
const TABLE = "exam";
class ExamModel extends BaseModel {
    constructor() {
        super(TABLE);
        this.ques = new QuesModel();
    }
    getLevel(level) {
        return new Promise((res, rej) => {
            knex("exam").where({ "level": level }).select('*')
                .then(levels => {
                    res(levels);
                })
                .catch(err => rej(err));
        })
    }
    getExam(id) {
        return new Promise((res, rej) => {
            knex('exam').where({ "exam.idexam": id })
                .andWhere('question.idtype', '>', 2)
                .innerJoin("exam_ques", "exam.idexam", "exam_ques.idexam")
                .innerJoin("question", "exam_ques.idques", "question.idquestion")
                .innerJoin("ques_ans", "question.idquestion", "ques_ans.idquestion")
                .innerJoin("answer", "answer.idanswer", "ques_ans.idanswer")
                .innerJoin("mondai", "mondai.idmondai", "exam_ques.mondai")
                .select('*')
                .then(data => {
                    const list = d3.nest()
                        .key(function(d) { return d.mondai })
                        .key(function(d) { return d.idquestion })
                        .entries(data);
                    res(list);

                })
        })

    }

    getDokkai(id) {
        return new Promise((res, rej) => {
            knex('exam').where({ "exam.idexam": id })
                .innerJoin("exam_ques", "exam.idexam", "exam_ques.idexam")
                .innerJoin("question", "exam_ques.idques", "question.idquestion")
                .innerJoin("ques_ans", "question.idquestion", "ques_ans.idquestion")
                .innerJoin("answer", "answer.idanswer", "ques_ans.idanswer")
                .innerJoin("mondai", "mondai.idmondai", "exam_ques.mondai")
                .innerJoin("dok_ques", "dok_ques.idques", "question.idquestion")
                .innerJoin("dokkai", "dokkai.iddokkai", "dok_ques.iddokkai")
                .select('*')
                .then(data => {
                    const dokkai = d3.nest()
                        .key(function(d) { return d.mondai })
                        .key(function(d) { return d.iddokkai })
                        .key(function(d) { return d.idquestion })
                        .entries(data)
                    res(dokkai)
                })
        })
    }
    getChoukai(id) {
        return new Promise((res, rej) => {
            knex('exam').where({ "exam.idexam": id })
                .andWhere('question.idtype', 2)
                .innerJoin("exam_ques", "exam.idexam", "exam_ques.idexam")
                .innerJoin("question", "exam_ques.idques", "question.idquestion")
                .innerJoin("ques_ans", "question.idquestion", "ques_ans.idquestion")
                .innerJoin("answer", "answer.idanswer", "ques_ans.idanswer")
                .innerJoin("mondai", "mondai.idmondai", "exam_ques.mondai")
                .select('*')
                .then(data => {
                    const list = d3.nest()
                        .key(function(d) { return d.mondai })
                        .key(function(d) { return d.idquestion })
                        .entries(data);
                    res(list);

                })
        })
    }
}
module.exports = ExamModel;