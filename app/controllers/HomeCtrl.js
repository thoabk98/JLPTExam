'use strict'
class HomeCtrl {
    constructor() {

    }
    index(req, res) {
        const title = "JLPT Test";
        res.render('../views/pages/index', { title });
    }
}
module.exports = HomeCtrl;