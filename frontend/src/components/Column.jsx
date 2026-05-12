import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function Column({ title, status, tasks, deleteTask }) {

  const filteredTasks = tasks.filter((t) => t.status === status);

  return (
    <div className="bg-white border rounded-md p-4">

      <h2 className="mb-4 font-medium">{title}</h2>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-[200px]"
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