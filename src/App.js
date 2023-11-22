import React, { useState, useEffect, useContext } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEditForm from './components/TaskEditForm';
import Login from './components/Login';
import { UserContext, UserProvider } from './context/UserContext';
import { loginUser } from './data/data.js';
import './App.module.css';

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(`tasks-${user?.id}`);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [editTask, setEditTask] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { id: tasks.length + 1, userId: user.id, ...newTask }];
    setTasks(updatedTasks);
  };

  const editTaskHandler = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTask(taskToEdit);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    setEditTask(null);
  };

  const cancelEdit = () => {
    setEditTask(null);
  };

  const sortTasks = () => {
    const sortedTasks = [...tasks];
    if (sortOrder === 'asc') {
      sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      setSortOrder('desc');
    } else {
      sortedTasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
      setSortOrder('asc');
    }
    setTasks(sortedTasks);
  };

  const handleLogin = async (loginUser) => {
    try {
      const loggedInUser = await loginUser(loginUser.username, loginUser.password);
      setUser(loggedInUser);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem(`tasks-${user?.id}`, JSON.stringify(tasks));
  }, [user, tasks]);

  return (
    <UserProvider>
    <div className="container">
      {user ? (
        <>
          <h1>Task Manager - Welcome, {user.username}!</h1>
          <div className="sort-button">
            <button onClick={sortTasks}>Sort by Deadline ({sortOrder === 'asc' ? 'Asc' : 'Desc'})</button>
          </div>
          <div className="logout-button">
            <button onClick={() => setUser(null)}>Logout</button>
          </div>
          {editTask ? (
            <TaskEditForm task={editTask} onUpdate={updateTask} onCancel={cancelEdit} />
          ) : (
            <TaskForm onAdd={addTask} />
          )}
          <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTaskHandler} />
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
        </>
      )}
    </div>
    </UserProvider>
  );
};

export default App;
