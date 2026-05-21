import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function Column({ title, status, tasks, deleteTask }) {

  const filteredTasks = tasks.filter((t) => t.status === status);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20">

      <h2
  className={`text-3xl text-center font-bold ${
    status === "todo"
      ? "text-red-400"
      : status === "doing"
      ? "text-yellow-400"
      : "text-green-400"
  }`}
>
  {title}
</h2>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
      
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-[200px]   text-2xl  p-5  "
          >
            {filteredTasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>
  );
}

export default Column;