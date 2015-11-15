var noteModel = require('../models/noteModel.js');

exports.list = function (req, res) {
    var query = noteModel.find();
    
    query.sort({ createdOn: 'desc' })
        .limit(12)
        .exec(function (err, results) {
        res.render('index', { title: "VScrum Meeting Notes", notes: results })
    });
};

exports.filterByMemberName = function (req, res) {
    var query = noteModel.find();
    var filter = req.body.memberName;
    
    query.sort({ createdOn: 'desc' });
    
    if (filter.length > 0) {
        query.where({ memberName: filter })
    }
    query.exec(function (err, results) {
        res.render('index', { title: 'VScrum Meeting Notes', notes: results });
    });
};

exports.create = function (req, res) {
    var entry = new noteModel({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });
    
    entry.save();
    
    res.redirect(301, '/');
};