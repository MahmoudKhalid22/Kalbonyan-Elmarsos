const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");

////////////////////////////////

router.post("/users", async (req, res) => {
  //with async and await
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }

  //with promise-chaining

  // user
  // .save()
  // .then(() => {
  //   res.status(201).send(user);
  // })
  // .catch((e) => {
  //   //https://www.httpstatuses.org/ from this page you can use any status
  //   res.status(400).send(e);
  // });
});
////////////////////////////////
router.post("./users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // : user.getPublicProfile()
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});
////////////////////////////////
router.post("./users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

////////////////////////////////
router.post("./users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
////////////////////////////////
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
  // try {
  //   const user = await User.find({});
  //   res.send(user);
  // } catch (e) {
  //   res.status(500).send();
  // }
});
////////////////////////////////
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});
////////////////////////////////
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "age", "password", "email"];
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid update!" });

  try {
    // const user = await User.findByIdAndUpdate(req.params.id);

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
////////////////////////////////
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);

    // if (!user) res.status(404).send();
    sendCancelationEmail(req.user.email, req.user.name);
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
////////////////////////////////
//multer is = npm for upload files
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    //(/\.(jpg|jpeg|png)$/) to match any of these types
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});
////////////////////////////////
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
////////////////////////////////
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});
////////////////////////////////

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

////////////////////////////////
module.exports = router;
