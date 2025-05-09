import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import FilterTasks from "./FilterTasks";

const TaskList = () => {
  const { tasks } = useTaskContext();

  return (
    <div className="space-y-4">
      <FilterTasks />
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
