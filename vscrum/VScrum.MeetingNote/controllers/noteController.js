var noteModel = require('../models/noteModel.js');

exports.list = function (req, res) {
    var query = noteModel.find();    
    query.sort({ createdOn: 'desc' })
        .limit(12)
        .exec(function (err, results) {
            // sort() cannot be used with distinct()
            noteModel.find().distinct('memberName').exec(function (err, members) {
                res.render('index', { title: "VScrum Meeting Notes", notes: results, names: members.sort() });
        });
        
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
        var distinctMembers = getDistinctMembers(results);
        res.render('index', { title: 'VScrum Meeting Notes', notes: results, names: distinctMembers });
    });
};

function getMembers()
{
    noteModel.find().distinct('memberName').exec(function (err, names) {
        if (err) return;
        if (names) {
            //return names;
            console.log(names);
        }
    });
}

exports.getProjects = function (req, res){
    var query = new noteModel.find();
}

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

function getDistinctMembers(obj)
{
    var members = [];
    obj.forEach(function (v) {
        members.push(v.memberName);
    });
    
    members = unique(members);
    return members;
}

// Function to get unique elements from an array
function unique(a) {
    var tmp = {}, out = [];
    for (var i = 0, n = a.length; i < n; ++i) {
        if (!tmp[a[i]]) {
            tmp[a[i]] = true;
            out.push(a[i]);
        }
    }
    return out;
}