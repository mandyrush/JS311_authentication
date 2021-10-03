const express = require('express');
const env = require('dotenv').config();
const app = express();

// Add support to parse the body in json
app.use(express.json());

let authRoutes = require('./routes/auth');
app.use(authRoutes);

let userRoutes = require('./routes/users');
app.use(userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});