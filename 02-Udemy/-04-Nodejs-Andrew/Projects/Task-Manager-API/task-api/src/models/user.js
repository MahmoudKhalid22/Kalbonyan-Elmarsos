const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

////////////////////////////////////////////
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      //trim to make it not to take any space
      trim: true,
    },
    email: {
      type: String,
      unique: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      validate(value) {
        if (value.includes("password")) {
          throw new Error("password can not contain password word");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);
////////////////////////////////////////////
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "",
});

////////////////////////////////////////////
userSchema.methods.toJSON = async function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};
////////////////////////////////////////////
////////////////////////////////////////////
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismytask");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
////////////////////////////////////////////
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("unable to login");
  }

  return user;
};
////////////////////////////////////////////
// hashing password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
const User = mongoose.model("User", userSchema);
////////////////////////////////////////////
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });

  next();
});
////////////////////////////////////////////

////////////////////////////////////////////

// const me = new User({
//   name: "ali",
//   email: "mo2dssaid@gmail.com",
//   password: "mohamlsd43sddl",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   });
////////////////////////////////////////////
////////////////////////////////////////////
module.exports = User;
