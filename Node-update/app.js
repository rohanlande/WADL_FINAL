const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./models");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017");

app.use("/css", express.static(path.resolve(__dirname, "static/css")));
app.get("/", (req, res) => {
  const me = "add";
  res.render("index", { me });
});

app.post("/addmarks", (req, res) => {
  const myData = new Student(req.body);
  myData
    .save()
    .then((item) => {
      console.log("item saved to database");
      res.redirect("/getMarks");
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

app.post("/update/:id", async (req, res) => {
  try {
    const dt = await Student.findByIdAndDelete(req.params.id);
    console.log("Deleted Successfully while updating");
    console.log(dt);
    const me = null;
    res.render("index", { me: me });
  } catch (error) {
    console.log(error);
  }
});

app.get("/above25", (req, res) => {
  Student.find({
    $and: [
      { wad_marks: { $gt: 25 } },
      { cc_marks: { $gt: 25 } },
      { dsbda_marks: { $gt: 25 } },
      { ai_marks: { $gt: 25 } },
      { cns_marks: { $gt: 25 } },
    ],
  })
    .then((student) => {
      res.render("table", { student });
    })
    .catch((err) => console.log(err));
});

app.get("/lessthan40", (req, res) => {
  Student.find({
    $and: [{ ai_marks: { $lt: 40 } }, { cns_marks: { $lt: 40 } }],
  })
    .then((student) => {
      res.render("table", { student });
    })
    .catch((err) => console.log(err));
});

app.get("/getMarks", async (req, res) => {
  const st = await Student.find({});
  try {
    res.render("table", { student: st });
  } catch (error) {}
});
app.get("/dsbdaGreaterThan20", (req, res) => {
  Student.find({ dsbda_marks: { $gt: 20 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ messagse: "err" });
    });
});

app.get("/wadccGreaterThan40", (req, res) => {
  Student.find({ wad_marks: { $gt: 40 }, cc_marks: { $gt: 40 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});

app.post("/deleteStudent/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id).then((student) => {
    console.log("Deleted Successfully");
    res.redirect("/getMarks");
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
