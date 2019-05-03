const express = require('express');
const bodyParser = require('body-parser');

// Instantiate Express
const app = express();

// Body parser to parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy database
const database = {
    users: [
        {
            id: 1,
            name: 'Jon Snow',
            email: 'jonsnow@got.com',
            password: 'kingslanding',
            entries: 0,
            joined: new Date(),
        },
        {
            id: 2,
            name: 'Arya Stark',
            email: 'a.stark@got.com',
            password: 'winterfell',
            entries: 0,
            joined: new Date(),
        }
    ] 
}

// Root route to get all registered users
app.get('/', (req, res) => {
    res.status(200).json(database.users);
})

// POST /login route
app.post('/login', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.status(200).json({
                status: 200,
                message: 'Login successful',
            });
        } else {
            res.status(400).json({
                status: 400,
                message: 'Email and password do not match.'
            });
        }
})

// POST /register route
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    database.users.push({
        id: 3,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date(),
    });
    res.status(201).json(database.users[database.users.length - 1]);
})

// GET /profile/:userId get a user route
app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;
    const id = Number(userId);
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.status(200).json(user);
        } 
    });
    if (!found) {
        res.status(404).json('No such user');
    }
})

// PORT declaration
app.listen('9001', () => {
    console.log('Server running on port 9001');
});
