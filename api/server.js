const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('The root route is working!');
})

app.listen('9001', () => {
    console.log('Server running on port 9001');
});
