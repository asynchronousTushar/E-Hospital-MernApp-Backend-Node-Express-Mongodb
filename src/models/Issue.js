const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true
    },
    preferredDoctor: {
        type: mongoose.Schema.Types.ObjectId
    },
    issue: {
        type: Object,
        required: true
    }
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;