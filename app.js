require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const todoController = require('./controllers/todo_controller.js');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 
app.get('/', function(req, res){
res.status(200).json({message:'Welcome to Lord Todo API'});
});
app.get('/todo', todoController.getAllTodo);
app.post('/todo', todoController.addTodo);
app.patch('/todo/:todoId', todoController.updateTodoById);
app.delete('/todo/:todoId', todoController.deleteTodoById);
app.get('/todo/:todoId', todoController.getTodoById);

app.listen(PORT, function(){
console.log('Server has started to run');
mongoose.connect(process.env.DB_URL) 
.then(function(){
console.log('DB is connected');
})
.catch(function(error){
console.log('DB is not connected: ', error.message);
})});




