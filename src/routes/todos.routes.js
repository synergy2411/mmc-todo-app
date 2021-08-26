const express = require("express")
const TodoModel = require("../controller/model/todo.model");

const router = express.Router()

router.route("")            // http://localhost:9090/todos
    .get(async (req, res, next) => {
        console.log("API HIT - GET TODOS")
        try{
            const allTodos = await TodoModel.find()
            console.log(allTodos)
            return res.send(allTodos)
        }catch(err){
            return res.send(err)
        }
    })
    .post(async (req, res) => {
        if(req.body){
            const todo = new TodoModel({...req.body})
            try{
                const savedTodo = await todo.save()
                return res.send({...savedTodo._doc})
            }catch(err){
                return res.send({...err.errors})
            }
        }else{
            return res.send({message : "Request body not found."})
        }
    })

router.route("/:id")            //http://localhost:9090/todos/{id}
    .get(async (req, res) => {
        const {id} = req.params;
        try{
        const foundItem = await TodoModel.findById(id);
        return res.send({...foundItem._doc})
        }catch(err){
            return res.send({message : "Unable to find Item with ID - " + id, err})
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try{
            const deletedItem = await TodoModel.findByIdAndDelete(id)
            return res.send({...deletedItem._doc});
        }catch(err){
            return res.send({message : "Unable to delete for id - " + id, err})
        }
    })
    .patch(async (req, res)=>{
        const {id} = req.params;
        if(req.body){
            try{
                const updatedItem = await TodoModel.findByIdAndUpdate(id, {...req.body})
                return res.send({...updatedItem._doc})
            }catch(err){
                return res.send({message : "Unable to update for id - " + id, err})
            }
        }else{
            return res.send({message : "Body not found"})
        }
    })

module.exports = router;

// patch - todos/id
// delete - todos/id
