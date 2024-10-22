const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, this is practice Node API');
});

// app.listen(PORT, () => {
//     console.log('Server running on http://localhost:${PORT} ');
// });

let users = [
    { id: 1, name: 'Enosh Dissanayake', email: 'esd@gmail.com' },
    { id: 2, name: 'Sathsara Dissa', email: 'sath@gmail.com' }
];

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);

});

app.get('/api/users/:id', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name;
    user.email = req.body.email;
    res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    users.splice(userIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});