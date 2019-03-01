'use strict'
const ExamModel = require('../models/ExamModel');
const QuesModel = require('../models/QuesModel');
const EXModel = require('../models/Exam_QuesModel')
class AdminCtrl {
    constructor() {
        this.exam = new ExamModel();
        this.ques = new QuesModel();
        this.ques_exam = new EXModel();
    }
    index(req, res) {
        if (req.session.email) {
            res.render('../views/pages/administer');
        } else {
            res.redirect('/login')
        }
    }
    signout(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        })

    }
    ShowExam(req, res) {
        if (req.session.email) {
            const level = req.params.level;
            this.exam.getLevel(level)
                .then(exams => {
                    res.render('../views/pages/exam', { exams });
                })
        }
    }
    AddIndex(req, res) {
        if (req.session.email) {
            const type = ["Dokkai", "Choukai", "Goi", "Bunpo"]
            Promise.all(type.map(this.ques.getQuesbyType))
                .then(result => {
                    res.render('../views/pages/addexam', { Dokkai: result[0], Choukai: result[1], Goi: result[2], Bunpo: result[3] })
                })
        } else {
            res.redirect('/login')
        }

    }
   
}
module.exports = AdminCtrl;