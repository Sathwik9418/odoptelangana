const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection string
const connectionString = 'mongodb+srv://esathwikkumar:hp6VwMluheTBu7Vv@cluster-s.mcbjj.mongodb.net/appdbs?retryWrites=true&w=majority&appName=Cluster-S';
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Post model
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to create a new post
app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from MongoDB
        res.status(200).json(posts); // Send posts as JSON response
    } catch (error) {
        res.status(500).send(error); // Handle error
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

