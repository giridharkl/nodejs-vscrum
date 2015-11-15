var express = require('express');
var router = express.Router();
var noteCtrl = require('../controllers/noteController.js');

/* Get newnote */
router.get('/', function (req, res) {
    res.render('newnote', { title: 'New Note' });
});

router.post('/', function (req, res) {
    return noteCtrl.create(req, res);
})

module.exports = router;