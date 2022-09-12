// const { MongoClient, ObjectId } = require("mongodb");

// const connectionURL = "mongodb://127.0.0.1:27017";
// const databaseName = "task-manager";

// const _id = new ObjectId();
// console.log(_id.id.length);
// console.log(_id.toHexString());
// // console.log(_id.toHexString().length);
// // console.log(_id.getTimestamp());

// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable to connect to database!");
//     }

//     const db = client.db(databaseName);
//////////////////////////
// to insert one of data
//////////////////////////
// db.collection("users").insertOne(
//   {
//     _id,
//     name: "Mohamed",
//     age: 21,
//   },
//   (error, result) => {
//     if (error) {
//       return console.log("Unable to insert user");
//     }

//     console.log(result);
//   }
// );
//////////////////////////

// to insert many of data
//////////////////////////
// db.collection("users").insertMany(
//   [
//     {
//       name: "Said",
//       age: 49,
//     },
//     {
//       name: "Ali",
//       age: 13,
//     },
//   ],
//   (error, result) => {
//     if (error) {
//       return console.log("Unable to insert users");
//     }

//     console.log(result);
//   }
// );
//////////////////////////
// to add new collection data
//////////////////////////
// db.collection("tasks").insertMany(
//   [
//     {
//       description: "Clean my room",
//       completed: true,
//     },
//     {
//       description: "Finish my course node.js",
//       completed: false,
//     },
//     {
//       description: "Do my homework",
//       completed: false,
//     },
//   ],
//   (error, result) => {
//     if (error) {
//       return console.log("Unable to insert tasks");
//     }

//     console.log(result);
//   }
// );
//////////////////////////
// to find one data
//////////////////////////
// db.collection("users").findOne(
//   { _id: new ObjectId("62fa316bab072b3d102c13c1") },
//   (error, user) => {
//     if (error) {
//       return console.log("Unable to fetch user");
//     }

//     console.log(user);
//   }
// );
//////////////////////////
// to find one data
//////////////////////////
// db.collection("users")
//   .find({ age: 24 })
//   .toArray((error, users) => {
//     console.log(users);
//   });
//////////////////////////
// to find one data
//////////////////////////
// db.collection("users")
//   .find({ age: 24 })
//   .count((error, count) => {
//     console.log(count);
//   });
//////////////////////////
// to find one data
//////////////////////////
// db.collection("tasks").findOne(
//   { _id: new ObjectId("62fa316bab072b3d102c13c1") },
//   (error, task) => {
//     if (error) {
//       console.log("Unable to find task");
//     }

//     console.log(task);
//   }
// );
//////////////////////////
// to update data
//////////////////////////
// db.collection("users")
//   .updateOne(
//     {
//       _id: new ObjectId("62fa316bab072b3d102c13c1"),
//     },
//     {
//       $inc: {
//         age: 1,
//       },
//     }
//   )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
//////////////////////////
// to update many of data
//////////////////////////
// db.collection("tasks")
//   .updateMany(
//     {
//       completed: false,
//     },
//     {
//       $set: {
//         completed: true,
//       },
//     }
//   )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//////////////////////////
// to delete data
//////////////////////////

// db.collection("users")
//   .deleteMany({
//     completed: "false",
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// db.collection("tasks")
//   .deleteOne({
//     description: "Do my homework",
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
//   }
// );
