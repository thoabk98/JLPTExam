'use strict'
const QuesModel = require('../models/QuesModel');
const AnsModel = require('../models/AnsModel');
const Ques_AnsModel = require('../models/Ques_AnsModel');
const TypeModel = require('../models/TypeModel');
const upload = require('express-fileupload');
class QuesCtrl {
    constructor() {
        this.type = new TypeModel();
        this.ques = new QuesModel();
        this.ans = new AnsModel();
        this.ques_ans = new Ques_AnsModel();
    }
    show(req, res) {
        if (req.session.email) {
            const type = req.params.type;
            res.redirect('/ques/' + type + '/0');

        }
    }
    showQues(req, response) {
        if (req.session.email) {
            const type = req.params.type;
            const ofset = parseInt(req.params.page) * 10;
            return new Promise((res, rej) => {
                this.ques.getQuesbyType(type, ofset)
                    .then(questions => {
                        this.ques.sum({ 'idtype': questions[0].idtype })
                            .then(num => {
                                const sum = parseInt(num[0]['count(`idquestion`)']) / 10;
                                const pages = [];
                                for (let index = 0; index < sum; index++) {
                                    pages[index] = index + 1;
                                }
                                response.render('../views/pages/question', { questions, type, pages });
                            })

                    })
            })
        } else {
            response.redirect('/login')
        }
    }

    question(req, response) {
        if (req.session.email) {
            const id = req.params.id;
            return new Promise((res, rej) => {
                this.ques.getbyid(id)
                    .then(result => {
                        const results = JSON.stringify(result);
                        response.send(results);
                    })
            })
        } else {
            response.redirect('/login');
        }
    }
    pages(req, response) {
        if (req.session.email) {
            const id = req.params.id;
            const idq = req.params.idq;
            console.log(id, idq);
            return new Promise((res, rej) => {
                this.ques.next(id, idq)
                    .then(result => {
                        const results = JSON.stringify(result);
                        response.send(results);
                    })
            })
        } else {
            response.redirect('/login');
        }
    }
    prev(req, response) {
        if (req.session.email) {
            const id = req.params.id;
            const idq = req.params.idq;
            console.log(id, idq);
            return new Promise((res, rej) => {
                this.ques.prev(id, idq)
                    .then(result => {
                        const results = JSON.stringify(result);
                        response.send(results);
                    })
            })
        } else {
            response.redirect('/login');
        }
    }
    uploadIndex(req, res) {
        if (req.session.email) {
            res.render('../views/pages/uploadques');
        }
    }
    upload(req, res) {
        if (req.session.email) {
            if (!req.body) console.log("Error Upload File");
            this.type.get({ "type": req.body.type })
                .then(idtype => {
                    this.ques.add({ "ques_content": req.body.question, "idtype": idtype.idtype })
                        .then(i => {
                            const idquestion = i[0];
                            this.ans.add({ "ans_content": req.body.ansA })
                                .then(idA => {
                                    console.log(idA);
                                    if (!req.body.checkA) {
                                        this.ques_ans.add({ "idquestion": idquestion, "idanswer": idA[0], "check": 0 })
                                    } else {
                                        this.ques_ans.add({ "idquestion": idquestion, "idanswer": idA[0], "check": 1 })
                                    }

                                });
                            this.ans.add({ "ans_content": req.body.ansB })
                                .then(idB => {
                                    console.log(idB)
                                    if (!req.body.checkB) {
                                        this.ques_ans.add({ "idquestion": idquestion, "idanswer": idB[0], "check": 0 })
                                    } else {
                                        this.ques_ans.add({ "idquestion": idquestion, "idanswer": idB[0], "check": 1 })
                                    }

                                });
                            this.ans.add({ "ans_content": req.body.ansC })
                                .then(idC => {
                                    if (!req.body.checkC) {
                                        this.ques_ans.add({ "idquestion": idquestion, "idanswer": idC[0], "check": 0 })
                                    } else {
                                        this.ques_ans.add({ "idquestion": idquestion, "idanswer": idC[0], "check": 1 })
                                    }

                                });
                            this.ans.add({ "ans_content": req.body.ansD })
                                .then(idD => {
                                    if (!req.body.checkD) {
                                        this.ques_ans.add({ "idquestion": idquestion, "idanswer": idD[0], "check": 0 })
                                    } else {
                                        this.ques_ans.add({ "idquestion": idquestion, "idanswer": idD[0], "check": 1 })
                                    }
                                });


                        })
                        .then(a => {
                            res.redirect('/ques/Goi');
                        })

                })
        }

    }
    delQues(req, res) {
        const id = parseInt(req.params.id);
        const quesID = {
            "idquestion": id
        }
        const type = req.params.type;
        this.ques.del(quesID)
            .then(result => {
                res.redirect('/ques/' + type)
            })
    }
}
module.exports = QuesCtrl;