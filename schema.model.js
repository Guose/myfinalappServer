const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TodoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    completed: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
    }
})

module.exports = mongoose.model('Todo', TodoSchema)