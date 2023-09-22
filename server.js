const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const TodoSchema = require('./schema.model')
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://justinelder:Mypass123@project1.vxblm.mongodb.net/FinalDB?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('DATABASE IS CONNECTED')
})

app.delete('/delete', (req, res) => {
    console.log('DELETED: ', req.body)
    let id = req.body.id
    TodoSchema.findByIdAndDelete(id, (err, deletion) => {
        res.send(deletion)
    })
})

app.get('/list', (req, res) => {
    TodoSchema.find( (err, response) => {
        res.json(response)
    })
}).patch((err) => {
    console.log(err.message)
})

app.put('/update', (req, res) => {
    try {
        let id = req.body.data._id
        console.log('id to update: ', id)
        if (!id) {
            return res.status(400).json({ error: 'ID is not found' })
        }

        // Add the update data as the second argument
        TodoSchema.findByIdAndUpdate(id, req.body.data, { new: true }, (err, updatedToDo) => {
            if (err) {
                console.error('Error updating ToDo:', err)
                return res.status(500).json({ error: 'An error occurred while updating.' })
            }

            if (!updatedToDo) {
                return res.status(404).json({ error: 'ToDo not found.' })
            }

            // Send response here
            console.log('response sent: ', updatedToDo)
            res.json(updatedToDo)
        });
    } catch (error) {
        console.error('try/catch error: ', error.message)
        res.status(400).json({ error: 'An error occurred - PUT try/catch' })
    }
})


app.post('/create', (req, res) => {
    console.log('REQ.BODY: ', req.body)
    let newTodo = req.body
    let todo = new TodoSchema(newTodo)
    console.log('TODO: ', todo)
    todo.save()
    .then(todo => {
        res.send(todo)
    })
})

app.listen(PORT, () => {
    console.log('Listening on Port ', PORT)
})