import React, { useEffect, useState } from 'react';
import '../index.css';
import Input from './Input';
import axios from 'axios';

const Home = () => {
  const onDone = (id) => {
    axios.put('http://localhost:3001/put/' + id)
      .then(result => location.reload())
      .catch(err => console.log(err));
  };

  const onDelete = (id) => {
    axios.delete('http://localhost:3001/delete/'+ id)
    .then(result=>location.reload())
    .catch(err=>console.log(err))
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []); // Empty dependency array to ensure it runs once

  return (
    <div className="container">
      <h2 className="title">Todo List</h2>
      <Input />
      {todos.length === 0 ? (
        <div className="no-record">No Record Found</div>
      ) : (
        todos.map((todo, index) => (
          <div key={index} className={`todo-item ${todo.done ? 'done' : ''}`}>
            {todo.task}
            <span><button onClick={() => onDone(todo._id)}>Done</button></span>
            <span><button onClick={()=>onDelete(todo._id)}>Delete</button></span>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
