const mongoose = require("mongoose");
const User = require("./user");
//////////////////
const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);
//////////////////
const Task = mongoose.model("tasks", taskSchema);
//////////////////

module.exports = Task;
// const task1 = new tasks({
//   description: "this is the first task",

//   completed: "false",
// });

// task1
//   .save()
//   .then(() => console.log(task1))
//   .catch((error) => {
//     console.log("Error", error);
//   });
