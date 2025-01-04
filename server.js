const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const quizRoutes = require('./routes/quiz.routes');
const userRoutes = require('./routes/user.routes');
const companyRoutes = require('./routes/company.routes');
const commentRoutes = require('./routes/comment.routes');
const notificationRoutes = require('./routes/notify.routes');



require('dotenv').config();

const app = express();
const server = http.createServer(app); 
app.use(express.json({ limit: '25mb' })); // For JSON payload
app.use(express.urlencoded({ extended: true, limit: '25mb' })); // Fo

// Serve the frontend
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
// Increase the payload size limit



// MongoDB connection
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err));
  
// Routes
app.use('/users', userRoutes);
app.use('/quiz', quizRoutes);
app.use('/company', companyRoutes);
app.use('/comment', commentRoutes);
app.use('/notify', notificationRoutes);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
