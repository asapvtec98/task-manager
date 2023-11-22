import React, { useState } from 'react';
import "./Task.css";

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState({ name: '', deadline: '', description: '', status: 'Pending' });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAdd(task);
    setTask({ name: '', deadline: '', description: '', status: 'Pending' });
  };

  return (
    <div className='task-panel'>
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input type="text" name="name" value={task.name} onChange={handleInputChange} />
      </label>
      <label>
        Deadline:
        <input type="date" name="deadline" value={task.deadline} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <textarea name="description" type="text" value={task.description} onChange={handleInputChange} />
      </label>
      <button className="add-button" type="submit">Add Task</button>
    </form>
    </div>
  );
};

export default TaskForm;
