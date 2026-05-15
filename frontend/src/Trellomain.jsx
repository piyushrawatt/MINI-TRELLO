
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import API from "./API/axios";
import Column from "./components/Column";
import { useNavigate } from "react-router-dom";

function Trellomain() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
 const navigate = useNavigate()
  // fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/task");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // add task
  const addTask = async () => {
    if (task.trim() === "") return;

    try {
      const res = await API.post("/task", {
        task,
        description: "my task",
        status: "todo"
      });

      setTasks((prev) => [...prev, res.data]);
      setTask("");
    } catch (err) {
      console.log(err);
    }
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/task/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // drag & drop
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    try {
      await API.put(`/task/${draggableId}`, {
        status: destination.droppableId
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === draggableId
            ? { ...t, status: destination.droppableId }
            : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  const logout = ()=>{
localStorage.removeItem("token")
navigate("/")
  }

  return (
    <div className="min-h-screen  p-6 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-trello.jpg')" }}>

      <h1 className="text-3xl text-center bg- mb-8 text-white font-semibold">
        Task Board
      </h1>
  <button
  onClick={logout}
  className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
  
>
  Logout
</button>


      {/* Add Task */}
      <div className="flex justify-center gap-2 mb-8">
        <input
          className="px-4 py-2 w-72 border rounded-md border-white"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add task..."
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>

      {/* Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">

          <Column title="Todo" status="todo" tasks={tasks} deleteTask={deleteTask} />
          <Column title="Doing" status="doing" tasks={tasks} deleteTask={deleteTask} />
          <Column title="Done" status="done" tasks={tasks} deleteTask={deleteTask} />

        </div>
      </DragDropContext>

    </div>
  );
}

export default Trellomain;