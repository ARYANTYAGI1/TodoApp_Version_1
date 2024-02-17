const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./model/Todo')
const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/todoApp')

app.post('/add',(req,res)=>{
    console.log(req.body)
    const task = req.body.task
    TodoModel.create({
        task:task
    }).then(result => res.json(result))
    .catch(err=>res.json(err))
})

app.put('/put/:id',async (req,res)=>{
    const id = req.params.id
    const task = await TodoModel.findById(id)
    console.log(task, 'Task is')
    task.done = true;
    await task.save()
    console.log(task)
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await TodoModel.deleteOne({ _id: id });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.get('/get',(req,res)=>{
    TodoModel.find().then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log('Server Started')
})