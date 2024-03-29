
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcrypt');

const users = [
  { user_id: 1, username: 'lil', email: 'lil@gmail.com', password: '123', role: 'admin' },
  { user_id: 2, username: 'bobo', email: 'bobo@gmail.com', password: "123", role: 'user' },
];

app.use(express.json());

const role = {
  ADMIN: 'admin',
  USER: 'user',
};

function authorize(role) {
  return function (req, res, next) {
    const userRole = req.headers.role;
    if (userRole !== role) {
      return res.status(401).send('Unauthorized');
    }
    next();
  };
}

// middleware d'authentification
function auth(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token,"mykey");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}

app.get('/api/user',authorize(role.ADMIN), (req, res) => {
  res.send(users);
});

app.get('/api/user/:id', auth,authorize(role.ADMIN), (req, res) => {
  const selectedUser = users.find((u) => u.user_id === parseInt(req.params.id));
  if (!selectedUser) return res.status(404).send('The user with the given ID was not found.');
  res.send(selectedUser);
});

app.post('/api/user',authorize(role.ADMIN), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      user_id: users.length + 1,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    };

    users.push(newUser);

    const token = jwt.sign(
      {
        id: newUser.user_id,
        username: newUser.username,
        role: newUser.role,
      },
      SECRET,
      { expiresIn: '1 hours' }
    );

    return res.json({ access_token: token });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

const SECRET = 'mykey';
app.post('/api/user/login', async (req, res) => {
  // Pas d'information à traiter
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Error. Please enter the correct username and password' });
  }

  // Checking
  const user = users.find((u) => u.username === req.body.username);
  // Pas bon
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ message: 'Error. Wrong login or password' });
  }

  const token = jwt.sign(
    {
      id: user.user_id,
      username: user.username,
      role: user.role,
    },
    SECRET,
    { expiresIn: '1 hours' }
  );

  return res.json({ access_token: token });
});


app.put('/api/user/:id', auth,authorize(role.ADMIN), async (req, res) => {
  try {
    const selectedUser = users.find((u) => u.user_id === parseInt(req.params.id));
    if (!selectedUser) return res.status(404).send('The user with the given ID was not found.');

    selectedUser.username = req.body.username;
    selectedUser.email = req.body.email;

    if (req.body.password) {
      selectedUser.password = await bcrypt.hash(req.body.password, 10);
    }

    res.send(selectedUser);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/user/:id', auth, (req, res) => {
  const selectedUser = users.find((u) => u.user_id === parseInt(req.params.id));
  if (!selectedUser) return res.status(404).send('The user with the given ID was not found.');

  const index = users.indexOf(selectedUser);
  users.splice(index, 1);
  res.send(selectedUser);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));


