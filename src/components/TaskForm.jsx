import { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const { tasks, dispatch } = useTaskContext();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((task) => task.id === parseInt(id));
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDueDate(taskToEdit.dueDate);
        setStatus(taskToEdit.status);
      }
    }
  }, [id, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { id: parseInt(id), title, dueDate, status };

    if (id) {
      dispatch({ type: "UPDATE_TASK", payload: updatedTask });
    } else {
      const newTask = { id: Date.now(), title, dueDate, status };
      dispatch({ type: "ADD_TASK", payload: newTask });
    }

    navigate("/");
    setTitle("");
    setDueDate("");
    setStatus("To Do");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        {id ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
