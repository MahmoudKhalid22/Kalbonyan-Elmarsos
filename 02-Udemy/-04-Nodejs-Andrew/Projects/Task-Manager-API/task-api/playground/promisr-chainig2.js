require("../src/db/mongoose.js");
const Task = require("../src/models/task.js");
// with promise-chaining

// Task.findByIdAndDelete("62fa5d52c5489855028abda")
//   .then((task) => {
//     console.log(task);

//     return Task.countDocuments();
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//with async and await
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments();
  return count;
};

deleteTaskAndCount("62fa5d52c5489855028abda")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
