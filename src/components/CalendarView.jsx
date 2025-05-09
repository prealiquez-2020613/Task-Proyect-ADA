import { Calendar } from "react-calendar";
import { useTaskContext } from "../context/TaskContext";
import "react-calendar/dist/Calendar.css";
import './CalendarView.css'

const CalendarView = () => {
  const { tasks } = useTaskContext();

  const taskDates = tasks.map(task => new Date(task.dueDate));

  return (
    <div className="flex justify-center">
      <Calendar
        tileContent={({ date }) => {
          const dateStr = date.toISOString().split("T")[0];
          const task = tasks.find(task => task.dueDate === dateStr);
          return task ? <span>{task.title}</span> : null;
        }}
      />
    </div>
  );
};

export default CalendarView;
