import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TaskProvider } from "../context/TaskContext";
import FilterTasks from "../components/FilterTasks";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import TaskList from "../components/TaskList";

const mockTasks = [
  { id: 1, title: "Tarea 1", dueDate: "2025-05-20", status: "To Do" },
  { id: 2, title: "Tarea 2", dueDate: "2025-05-21", status: "Completed" },
];

const customRender = (ui) => {
  return render(<TaskProvider>{ui}</TaskProvider>);
};

describe("Componentes del Gestor de Tareas", () => {

  test("Renderiza botones de filtro y enlaces de navegación en FilterTasks", () => {
    render(
      <MemoryRouter>
        <TaskProvider>
          <FilterTasks />
        </TaskProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Create Task")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });

  test("Renderiza correctamente el formulario de tareas (TaskForm)", () => {
    render(
      <MemoryRouter>
        <TaskProvider>
          <TaskForm />
        </TaskProvider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Task Title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Task/i })).toBeInTheDocument();
  });

  test("Permite completar y eliminar una tarea en TaskItem", () => {
    render(
      <MemoryRouter>
        <TaskProvider>
          <TaskItem task={mockTasks[0]} />
        </TaskProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Tarea 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Complete"));
    fireEvent.click(screen.getByText("Delete"));
  });

  test("Muestra correctamente las tareas en TaskList", () => {
    const customContext = {
      tasks: mockTasks,
      dispatch: vi.fn(),
      setFilter: vi.fn()
    };

    const MockedProvider = ({ children }) => (
      <TaskProvider>
        {children}
      </TaskProvider>
    );

    render(
      <MemoryRouter>
        <MockedProvider>
          <TaskList />
        </MockedProvider>
      </MemoryRouter>
    );
  });

  test("Permite agregar nueva tarea desde TaskForm", () => {
    render(
      <MemoryRouter initialEntries={["/create"]}>
        <TaskProvider>
          <Routes>
            <Route path="/create" element={<TaskForm />} />
          </Routes>
        </TaskProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Task Title"), {
      target: { value: "Tarea de prueba" },
    });

    fireEvent.change(screen.getByDisplayValue("To Do"), {
      target: { value: "In Progress" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Task/i }));
  });
});
