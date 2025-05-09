import React, { createContext, useContext, useReducer, useEffect } from "react";
import { taskReducer } from "./TaskReducer";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [filter, setFilter] = React.useState('All');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => {
      dispatch({ type: "ADD_TASK", payload: task });
    });
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  return (
    <TaskContext.Provider value={{ tasks: filteredTasks, dispatch, setFilter }}>
      {children}
    </TaskContext.Provider>
  );
};
