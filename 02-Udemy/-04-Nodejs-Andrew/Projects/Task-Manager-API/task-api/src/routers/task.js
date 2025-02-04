const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");
/////////////////

router.post("/tasks", auth, async (req, res) => {
  // const task = new tasks(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
////////////////////////////////
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  if (req.query.completed) {
    match.completed = req.completed === "true";
  }

  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // const task = await tasks.find({});
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();

    res.send(req.send.tasks);
  } catch (e) {
    res.status(500).send();
  }
});
////////////////////////////////
////////////////////////////////
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await tasks.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) res.status(404).send();
  } catch (e) {
    res.status(500).send();
  }
});
////////////////////////////////
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["description", "completed"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Update!" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    // const task = await tasks.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
////////////////////////////////

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await tasks.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

////////////////////////////////

module.exports = router;
