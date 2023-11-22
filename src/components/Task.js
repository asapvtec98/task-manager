import React from 'react';

const Task = ({ task, onDelete, onEdit }) => {
  const { id, name, deadline, description, status } = task;

  return (
      <div className={status}>
        <h3>{name}</h3>
        <p>Deadline: {deadline}</p>
        <p>Description: {description}</p>
        <p>Status: {status}</p>
        <div className="buttons">
          <button className="edit-button" onClick={() => onEdit(id)}>Edit</button>
          <button className="delete-button" onClick={() => onDelete(id)}>Delete</button>
        </div>
      </div>
  );
};

export default Task;
