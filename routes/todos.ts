import { Router } from 'express'
import { Todo } from '../models/todo';
let todos: Todo[] = [];
const router = Router();
type BodyRequest = { text: string }
type ParamsRequest = {todoId: string}
router.get('/', (req, res, next) => {
    res.status(200).json({todos})
})

router.post('/todo', (req,res,next)=>{
    const body = req.body as BodyRequest
    const newTodo: Todo = {
        id: new Date().toString(),
        text: body.text
    };
    todos.push(newTodo)
    res.status(201).json({message: 'added todo', newTodo})
})

router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body as BodyRequest;
    const params = req.params as ParamsRequest;
    const tid = params.todoId;
    const todoIndex = todos.findIndex(item => item.id === tid);
    if(todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text}
        return res.status(200).json({message: 'updated record', todos})
    }
    res.status(404).json({
        message: 'Item not found in DB'
    })
})

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as ParamsRequest;
    const tid = params.todoId;
    todos = todos.filter(item => item.id !== tid)
    res.status(201).json({message: "removed todo", todos})
})

export default router;