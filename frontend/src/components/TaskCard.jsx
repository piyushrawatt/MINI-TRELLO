import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, deleteTask }) {
  return (
    <Draggable draggableId={task._id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border rounded-md p-3 bg-gray-50 cursor-pointer"
        >
          <p className="text-gray-800">{task.task}</p>

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