import React, { useState } from 'react';
import '../index.css'; // Import the CSS file
import axios from 'axios'

const Input = () => {
    const [task,setTask] = useState('')
    const handleAdd=()=>{
        axios.post('http://localhost:3001/add',{task:task})
        .then(res=> location.reload())
        .catch(err => console.log(err))
    }
  return (
    <div className="input-container">
      <input type="text" className="input-field" onChange={(e)=> setTask(e.target.value)} />
      <button onClick={handleAdd} type="button" className="add-button">
        Add
      </button>
    </div>
  );
};

export default Input;