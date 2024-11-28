let feedbacks = [];


const submitFeedback = (req, res) => {
  const { teacher, course, feedback } = req.body;
  const feedbackEntry = {
    teacher,
    course,
    feedback,
    date: new Date(),
  };
  feedbacks.push(feedbackEntry);
  res.status(201).json({ message: "Feedback submitted successfully" });
};


const getFeedbacks = (req, res) => {
  res.status(200).json(feedbacks);
};

module.exports = { submitFeedback, getFeedbacks };
