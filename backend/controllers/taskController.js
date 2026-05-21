import Task from "../Schema/schema.js"

// ➕ Add Task
export const addTask = async (req, res) => {
  try {
const newTask = new Task({
  task: req.body.task,
  description: req.body.description,
  status: req.body.status || "todo",
  userid: req.body.userid
});

    await newTask.save();
    res.json(newTask);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 Get Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete Task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update Task
export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};