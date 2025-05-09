import { useTaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";

const FilterTasks = () => {
  const { setFilter } = useTaskContext();

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => handleFilterChange('All')}
        className="px-4 py-2 border rounded hover:bg-gray-200"
      >
        All
      </button>
      <button
        onClick={() => handleFilterChange('To Do')}
        className="px-4 py-2 border rounded hover:bg-gray-200"
      >
        To Do
      </button>
      <button
        onClick={() => handleFilterChange('In Progress')}
        className="px-4 py-2 border rounded hover:bg-gray-200"
      >
        In Progress
      </button>
      <button
        onClick={() => handleFilterChange('Completed')}
        className="px-4 py-2 border rounded hover:bg-gray-200"
      >
        Completed
      </button>

      <Link to="/create">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">
          Create Task
        </button>
      </Link>

      <Link to="/calendar">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">
          Calendar
        </button>
      </Link>
    </div>
  );
};

export default FilterTasks;
