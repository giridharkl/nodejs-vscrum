var express = require('express');
var router = express.Router();
var noteCtrl = require('../controllers/noteController.js');

/* GET home page. */
router.get('/', function (req, res) {
    //res.render('index', { title: 'VScrum Meeting Notes' });
    return noteCtrl.list(req, res);
});

router.post('/', function (req, res) {
    return noteCtrl.filterByMemberName(req, res);
});

module.exports = router;