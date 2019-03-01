'use strict'
const UserModel = require('../models/UserModel');
class LoginCtrl {
    constructor() {
        this.user = new UserModel();
    }
    index(req, res) {
        res.render('../views/pages/login');
    }
    login(req, res) {
        this.user.getUser(req.body.email, req.body.password)
            .then(id => {
                req.session.email = req.body.email;
                if (id[0].admin === 1) {
                    res.render('../views/pages/administer');
                } else if (id[0].admin === 0) {
                    res.redirect('/user');
                }
            })
    }
}
module.exports = LoginCtrl;