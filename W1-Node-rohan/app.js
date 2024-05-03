const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./models");
// const dbConfig = require("./config");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(() => {
    console.log("Could not connect to database", err);
    process.exit();
  });

app.use("/css", express.static(path.resolve(__dirname, "static/css")));
app.get("/", (req, res) => {
  res.render("index");
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

app.post("/update/:roll", async (req, res) => {
  const roll = req.params.roll;
  // Student.updateMany({ rollno: roll }, { $inc: { wad_marks: 10, cc_marks: 10, dsbda_marks: 10, cns_marks: 10, ai_marks: 10 } })
  //   .then((student) => {
  //     console.log('Updated')
  //     res.redirect('/getMarks')
  //   })
  try {
    const st = await Student.findByIdAndUpdate(roll, req.body);
    if (!st) res.status(404).json("error");
    res.status(200).json(st);
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
    // res.status(200).json({ st });
    res.render("table", { student: st });
  } catch (error) {}
});
app.get("/dsbdaGreaterThan20", (req, res) => {
  Student.find({ dsbda_marks: { $gt: 20 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
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
