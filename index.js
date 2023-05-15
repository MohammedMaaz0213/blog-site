const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const User = require("./models/User");
const multer = require("multer");
const path = require("path");
dotenv.config();

const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

mongoose
  .connect(
    "mongodb+srv://maaz:1234@cluster0.6ijeg7p.mongodb.net/?retryWrites=true&w=majority",
    {
      family: 4,
    }
  )
  .then(() => {
    console.log("FINE");
  })
  .catch((err) => {
    console.log(err);
  });
// app.post("/register", async (req, res) => {
//   try {
//     const newUser = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });
//     res.status(201).json(newUser);
//   } catch (err) {
//     console.log(err);
//   }
// });
app.listen(5000, () => {
  console.log("Server is listening.....");
});
