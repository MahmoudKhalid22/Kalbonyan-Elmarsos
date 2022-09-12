require("../src/db/mongoose.js");
const User = require("../src/models/user.js");

// with promise-chaining

// User.findByIdAndUpdate("62fa62dac517602d53978629", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//with async and await
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("62fa62dac517602d53978629", 24)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
