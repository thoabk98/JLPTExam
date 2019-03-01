'use strict'
const ExamModel = require('../models/ExamModel')
const QuesModel = require('../models/QuesModel')
const TypeModel = require('../models/TypeModel')
const Ques_AnsModel = require('../models/Ques_AnsModel')
const arraySort = require('array-sort');
class UserCtrl {
    constructor() {
        this.exam = new ExamModel();
        this.ques_ans = new Ques_AnsModel();
    }
    index(req, res) {
        const level = [1, 2, 3, 4, 5]
        Promise.all(level.map(this.exam.getLevel))
            .then(result => res.render('../views/pages/user', { listN1: result[0], listN2: result[1], listN3: result[2], listN4: result[3], listN5: result[4] }))
    }
    ShowTest(req, res) {
        const test = req.params.idexam;
        Promise.all([this.exam.getExam(test), this.exam.getDokkai(test), this.exam.getChoukai(test)])
            .then(result => {
                res.render('../views/pages/test', { question: result[0], dokkai: result[1], choukai: result[2] })
            })
    }
    check(req, res) {
        console.log(req.body);
        let keys = Object.keys(req.body)
        let obj = {}
        let i = 0
        this.ques_ans.getByIds(keys)
            .then(data => {
                arraySort(data, 'idquestion')
                data.map(item => {
                    obj[keys[i]] = item
                    i++
                })
                res.send(obj);
            });
    }
}

module.exports = UserCtrl;