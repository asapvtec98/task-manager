import React, { useState, useEffect } from 'react';
import "./Task.css";

const TaskEditForm = ({ task, onUpdate, onCancel }) => {
  const [editedTask, setEditedTask] = useState({
    id: task.id,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
    status: task.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTask);
  };

  useEffect(() => {
    setEditedTask(task);
  }, [task]);


  return (
    <div className='task-panel'>
    <form onSubmit={handleSubmit}>
    <label>
        Task Name:
        <input type="text" name="name" value={editedTask.name} onChange={handleChange} required />
      </label>
      <label>
        Deadline:
        <input type="date" name="deadline" value={editedTask.deadline} onChange={handleChange} required />
      </label>
      <label>
        <textarea type="text" name="description" value={editedTask.description} onChange={handleChange} required />
      </label>
      <label>
        Status:
        <select name="status" value={editedTask.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
      </label>
      <button type="submit">Update Task</button>
      <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
    </form>
    </div>
  );
};

export default TaskEditForm;
