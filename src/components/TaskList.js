import React from 'react';
import Task from './Task';
import "./Task.css";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.map(task => (
        <Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TaskList;
