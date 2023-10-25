const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); // Import express-session
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Configure express-session
app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// Load user data from users.json
const usersData = require('./data/users.json');

// Middleware to check if the user is authenticated
const checkAuthentication = (req, res, next) => {
    if (req.session && req.session.user) {
        // If the user is authenticated, continue
        return next();
    } else {
        // If not authenticated, redirect to the login page
        res.redirect('/login');
    }
};

app.get('/', checkAuthentication, (req, res) => {
    // Render the index.html page
    res.sendFile(__dirname + '/views/index.html');
});

// Rest of your code remains the same
app.get('/login', (req, res) => {
    // Render the login.html page
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = usersData.users.find((user) => user.username === username && user.password === password);

    if (user) {
        // Set user information in the session
        req.session.user = user;
        res.redirect('/');
    } else {
        res.send('Invalid username or password');
    }
});

// Rest of your code remains the same
app.get('/signup', (req, res) => {
    // Render the signup.html page
    res.sendFile(__dirname + '/views/signup.html');
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = usersData.users.find((user) => user.username === username);

    if (existingUser) {
        // Handle the case when the user already exists
        res.send('User already exists');
    } else {
        // Add the new user to the user data
        usersData.users.push({ username, password });
        // Save the updated user data back to the users.json file
        fs.writeFileSync('./data/users.json', JSON.stringify(usersData, null, 2));

        // Redirect to the login page or main page
        res.redirect('/login');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
