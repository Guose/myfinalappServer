const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
let ToDoSchema = require('./schema.model');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://justinelder:Mypass123@project1.vxblm.mongodb.net/FinalDB?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log('DATABASE IS CONNECTED');
})

app.delete('/delete', function(req, res) {
    console.log('DELETED: ', req.body);
    let id = req.body.id;
    ToDoSchema.findByIdAndDelete(id, function(err, deletion) {
        res.send(deletion);
    })
})

app.get('/list', function(req, res) {
    ToDoSchema.find(function (err, response) {
        res.json(response);
    })
})

app.post('/create', function(req, res) {
    console.log('REQ.BODY: ', req.body);
    let newTodo = req.body;
    let todo = new ToDoSchema(newTodo);
    console.log('TODO: ', todo);
    todo.save()
    .then(todo => {
        res.send(todo);
    })
})

app.listen(PORT, function(req, res) {
    console.log('Listening on Port 3001');
})
