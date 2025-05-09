import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView";

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/create" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            <Route path="/calendar" element={<CalendarView />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
