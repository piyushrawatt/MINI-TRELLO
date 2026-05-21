import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, deleteTask }) {
  return (
    <Draggable draggableId={task._id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        className={`rounded-xl p-4 shadow-md text-white ${
    task.status === "todo"
      ? "bg-red-500/20 border border-red-400"
      : task.status === "doing"
      ? "bg-yellow-500/20 border border-yellow-400"
      : "bg-green-500/20 border border-green-400"
  }`}
        >
       <p className="text-xl font-medium">
  {task.task}
</p>

          <div className="flex gap-2 mt-3 text-sm">
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500 ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;