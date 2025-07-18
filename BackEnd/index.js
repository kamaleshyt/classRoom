const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// import router
const signupRouter = require("./route/signupRoute");
const studentRouter = require("./route/studentsRoute");
const signinRoute = require("./route/signinRoute");
const student_markRoute = require("./route/student_markRoute");
const examRoute=require('./route/examRoute')
const departmentRoute = require('./route/departmentRoute')
const app = express();
app.use(cors());
app.use(express.json());

app.use("/signup", signupRouter);
app.use("/student", studentRouter);
app.use("/signin", signinRoute);
app.use("/student_mark", student_markRoute);
app.use('/exam',examRoute)
app.use('/department',departmentRoute)

app.use(morgan("dev"));

app.listen(5010, () => {
  console.log("Server running on http://localhost:5010");
});
