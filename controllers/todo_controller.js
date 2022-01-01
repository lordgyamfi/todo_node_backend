const Todo = require ('../models/Todo');
 
 
async function addTodo(req, res){
    try {
        const body = req.body;
        const title = body.title;
        const description = body.description;
        const deadline = Date(body.deadline); 

      const newTodo = await Todo.create({
        title,
        description,
        deadline,
      });
      res.status(200).json(newTodo);
    }catch (error){
        console.log('Cant add data: ', error.message);
        res.status(401).json({message:'Cant add data'});
    }
}
 async function deleteTodoById(req, res){
     const todoId = req.params.todoId;
    try {
        await Todo.findByIdAndDelete(todoId);
        res.status(200).json({message:'Todo has been deleted'});
    } catch (error) {
        console.log('Cant delete: ', error.message);
        res.status(401).json({error: error.message});
    }
}

async function updateTodoById(req, res){
    const todoId = req.params.todoId;
    const body = req.body;
    const isCompleted = body.isCompleted;
    try {
       await Todo.findByIdAndUpdate(todoId, {isCompleted});
        res.status(200).json({message: 'Todo is Updated'});
    } catch (error) {
        console.log('Cant Update: ', error.message);
        res.status(401).json({error: error.message});
    }
}

async function getTodoById(req, res){
    try{
        const todo = await Todo.findById(req.params.todoId);
        res.status(200).json(todo);
    }catch(error) {
        console.log('Cant get todo: ', error.message);
        res.status(401).json({error: error.message});
    }
}

 async function getAllTodo(req, res){
     try{
        const todos = await Todo.find();
        res.status(200).json(todos);
     }catch (error) {
        console.log('cant find data: ', error.message);
        res.status(401).json({error: error.message});
     }
}

module.exports = {
    getAllTodo,
    addTodo,
    deleteTodoById,
    updateTodoById,
    getTodoById,
}