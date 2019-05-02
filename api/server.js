const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/', (req, res) => {
    res.status(200).json('The root route is working!');
})

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

app.listen('9001', () => {
    console.log('Server running on port 9001');
});
