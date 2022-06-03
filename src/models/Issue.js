const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true
    },
    admin: {
        type: Object,
        require: true
    },
    problem: {
        type: String,
        required: true
    }
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;