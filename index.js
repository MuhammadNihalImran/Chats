const express = require("express");
const path = require("path");
const { Chat } = require("./models/chat");

const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
var methodOverride = require("method-override");
const flash = require("connect-flash");
var session = require("express-session");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

const sessionOption = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOption));
app.use(flash());

main()
  .then(() => {
    console.log("connection is done");
  })
  .catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("server connection is successful");
  } catch (err) {
    console.log("server connection is failed");
  }
}

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.create = req.flash("create");
  res.locals.edit = req.flash("edit");
  next();
});

app.get("/chats", async (req, res) => {
  console.log("heelo", req.flash("create"));
  try {
    let Allchat = await Chat.find().sort({ created_at: -1 });
    res.render("index", { Allchat });
    console.log("allchat:", Allchat);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  console.log("heelo");
  let newChat = new Chat({
    from: from,
    to: to,
    message: msg,
    created_at: new Date(),
  });
  await newChat
    .save()
    .then((result) => console.log("new chat is created"))
    .catch((err) => console.log(err));
  req.flash("create", "Your chat created successfully");
  res.redirect("/chats");
});
app.get("/chats/new", (req, res) => {
  res.render("new");
});

app.get("/chats/:id/edit", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from req.params
    console.log("id:", id);
    const chat = await Chat.findById(id); // Use id instead of _id
    console.log("edit_chat:", chat);
    res.render("edit.ejs", { chat });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/chats/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { msg: newmsg } = req.body;
    const upsatechat = await Chat.findByIdAndUpdate(
      id,
      { message: newmsg },
      (updated_at = new Date()),
      { runvalidator: true, new: true }
    );
    req.flash("edit", "Your chat is edit successfully");
    res.redirect("/chats");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    req.flash("success", "Your chat is deleted successfully");
    res.redirect("/chats");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
