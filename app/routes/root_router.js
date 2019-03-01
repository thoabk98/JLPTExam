'use strict'
const BaseRouter = require('./base_router');
const LoginCtrl = require('../controllers/LoginCtrl');
const HomeCtrl = require('../controllers/HomeCtrl');
const AdminCtrl = require('../controllers/AdminCtrl');
const QuesCtrl = require('../controllers/QuesCtrl');
const UserCtrl = require('../controllers/UserCtrl')
class RootRouter extends BaseRouter {
    constructor() {
        super();
    }
    config() {
        const user = new UserCtrl();
        const home = new HomeCtrl();
        const login = new LoginCtrl();
        const admin = new AdminCtrl();
        const ques = new QuesCtrl();
        this.addRouter('GET', '/', home.index.bind(home));
        this.addRouter('GET', '/login', login.index.bind(login));
        this.addRouter('POST', '/login', login.login.bind(login));
        this.addRouter('GET', '/signout', admin.signout.bind(admin));
        this.addRouter('GET', '/exam/N/:level', admin.ShowExam.bind(admin));
        this.addRouter('GET', '/admin', admin.index.bind(admin));
        this.addRouter('GET', '/ques/:type', ques.showQues.bind(ques));
        this.addRouter('GET', "/uploadques", ques.uploadIndex.bind(ques));
        this.addRouter('POST', '/uploadques', ques.upload.bind(ques));
        this.addRouter('GET', '/user', user.index.bind(user));
        this.addRouter("GET", '/test/:idexam', user.ShowTest.bind(user));
        this.addRouter('POST', '/check', user.check.bind(user));
        this.addRouter('GET', '/del/:type/:id', ques.delQues.bind(ques));
        this.addRouter('GET', '/addexam', admin.AddIndex.bind(admin));
        this.addRouter('GET', '/ques/:type/:page', ques.showQues.bind(ques))
        this.addRouter('GET', '/addexam/:id', ques.question.bind(ques));
        this.addRouter('GET', '/addexam/:id/:idq', ques.pages.bind(ques));
        this.addRouter('GET', '/addexam/prev/:id/:idq', ques.prev.bind(ques));
    }

}
module.exports = RootRouter;