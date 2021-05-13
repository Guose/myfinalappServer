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
    }
});

module.exports = mongoose.model('Schema', NewSchema);