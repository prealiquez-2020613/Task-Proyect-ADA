import { useTaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";

const TaskItem = ({ task }) => {
  const { dispatch } = useTaskContext();

  const handleStatusChange = () => {
    const updatedTask = { ...task, status: "Completed" };
    dispatch({ type: "UPDATE_TASK", payload: updatedTask });
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: task.id });
  };

  return (
    <li className="flex justify-between items-center border-b p-2">
      <div>
        <span className="font-bold">{task.title}</span>
        <span className="ml-2 text-sm text-gray-500">{task.dueDate}</span>
        <span className="ml-2 text-sm">{task.status}</span>
      </div>
      <div className="flex space-x-2">

        <button
          onClick={handleStatusChange}
          className="text-green-500"
        >
          Complete
        </button>


        <button
          onClick={handleDelete}
          className="text-red-500"
        >
          Delete
        </button>


        <Link to={`/edit/${task.id}`}>
          <button className="text-blue-500">
            Edit
          </button>
        </Link>
      </div>
    </li>
  );
};

export default TaskItem;
