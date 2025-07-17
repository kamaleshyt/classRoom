const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// import router
const signupRouter=require('./route/signupRoute')
const studentRouter=require('./route/studentsRoute')
const signinRoute=require('./route/signinRoute')
const examRoute=require('./route/examRoute')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/signup',signupRouter)
app.use('/student',studentRouter)
app.use('/signin',signinRoute)
app.use('/exam',examRoute)

app.use(
  morgan( 'dev'
  )
);

app.listen(5010, () => {
  console.log("Server running on http://localhost:5010");
});
