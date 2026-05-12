import Task from "../Schema/schema.js";

export const addTask = async (req, res) => {
  try {
    const { task, description, status = "todo" } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }

    const newTask = new Task({
      task,
      description,
      status,
      user: req.user.id
    });

    await newTask.save();
    res.status(201).json(newTask);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .populate("user", "name email");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
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