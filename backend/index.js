// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const AuthRouter = require("./Routes/AuthRouter");
// require('dotenv').config();
// require('./Models/db');

// const PORT =process.env.PORT || 5000;
// app.get('/ping',(req,res)=>{
//     res.send("pong");
// })

// app.use(bodyParser.json());
// app.use(cors())
// app.use('/auth',AuthRouter)
// app.listen(PORT,()=>{ 
//     console.log(`Server is running on ${PORT}`);
// })
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const mongoURI =  "mongodb+srv://shubham:1234@cluster0.mqhqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 5000;

app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

const noticeSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
  });
  
  const feedbackSchema = new mongoose.Schema({
    teacher: String,
    course: String,
    feedback: String,
    date: { type: Date, default: Date.now },
  });
  
  const Notice = mongoose.model("Notice", noticeSchema);
  const Feedback = mongoose.model("Feedback", feedbackSchema);

  app.post("/teacher/notices", async (req, res) => {
    try {
      const { title, description } = req.body;
      const notice = new Notice({ title, description });
      await notice.save();
      res.status(201).json({ message: "Notice posted successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error posting notice", details: error });
    }
  });
  
  app.get("/teacher/feedback", async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: "Error fetching feedback", details: error });
    }
  });
  
  // Routes for Student
  app.post("/student/feedback", async (req, res) => {
    try {
      const { teacher, course, feedback } = req.body;
      const feedbackData = new Feedback({ teacher, course, feedback });
      await feedbackData.save();
      res.status(201).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error submitting feedback", details: error });
    }
  });
  
  app.get("/student/notices", async (req, res) => {
    try {
      const notices = await Notice.find();
      res.status(200).json(notices);
    } catch (error) {
      res.status(500).json({ error: "Error fetching notices", details: error });
    }
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
