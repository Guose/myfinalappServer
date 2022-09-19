const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NewSchema = new Schema({
    description: {
        type: String
    },
    priority: {
        type: String
    },
    completed: {
        type: String
    },
    done: {
        type: Boolean
    }
});

module.exports = mongoose.model('Schema', NewSchema);