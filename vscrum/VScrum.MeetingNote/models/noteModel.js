var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    memberName: String,
    project: String,
    workYesterday: String,
    workToday: String,
    impediment: String,
    createdOn: { type: Date, default: Date.now }
}, { collection: 'meetingnote' });

module.exports = mongoose.model('noteModel', noteSchema);