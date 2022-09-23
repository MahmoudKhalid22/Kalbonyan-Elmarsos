const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

/////////////////////////////////////////
const app = express();
const server = http.createServer(app);
const io = socketio(server);
/////////////////////////////////////////

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
/////////////////////////////////////////

app.use(express.static(publicDirectoryPath));
/////////////////////////////////////////

io.on("connection", (socket) => {
  console.log("new web connection");

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    //to emit to every one
    socket.emit("message", generateMessage("Admin", "Welcome!"));

    //emit to particular connection
    //to send to the head that other user use the page
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage("Admin", `${user.username} has joined`));
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  //to send to the head that other user left the page
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
  ////////////////
  //to emit to every one
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }

    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback();
  });
  ////////////////

  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });
  ////////////////
});
/////////////////////////////////////////

server.listen(port, () => {
  console.log(`server is up on ${port}`);
});
////////// ///////////////////////////////////

//challenges
// let count = 0;
// socket.on("increment", () => {
//   count++;
// emit to specific connection
//if you open two pages , the increase in count will be in the second page as the last increase in the first one
// socket.emit('countUpdated',count)
// emit to every single  connection
//   io.emit("countUpdated", count);
// });
