const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser les requêtes avec un body JSON
app.use(express.json());

// Simulation de la base de données pour stocker les catégories
let customer = [
  {
    customer_id: 1,
    user_id: 1,
    first_name: 'zcxczc',
    last_name: 'dfghj',
    email: 'sdff@gmail.com',
    address: 'sdfgh',
    zipcode: '122345',
    place: 'qsdfg',
    phone: '1234567988754',
    created_at: 'sdf1234654',
    paid_amount: '756366I8346',
    designer: 'dghnbvbd'
  },
  {
    customer_id: 2,
    user_id: 1,
    first_name: 'zcxczc',
    last_name: 'dfghj',
    email: 'sdff@gmail.com',
    address: 'sdfgh',
    zipcode: '122345',
    place: 'qsdfg',
    phone: '1234567988754',
    created_at: 'sdf1234654',
    paid_amount: '756366I8346',
    designer: 'dghnbvbd'
  }
];


// Récupérer toutes les catégories
app.get('/api/customer', (req, res) => {
  res.status(200).json(customer);
});

// Ajouter une nouvelle catégorie
app.post('/api/customer/newCustomer', (req, res) => {
  const newCustomer = {
    customer_id: req.body.customer_id,
    user_id: req.user_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    address: req.body.address,
    zipcode: req.body.zipcode,
    place: req.body.place,
    phone: req.body.phone,
    created_at: req.body.created_at,
    paid_amount: req.body.paid_amount,
    designer: req.body.designer,
  };

  customer.push(newCustomer);

  res.status(201).json(newCustomer);
});

// Récupérer une catégorie par ID
app.get('/api/customer/:customer_id', (req, res) => {
  const customers = customer.find(c => c.customer_id === parseInt(req.params.customer_id));

  if (!customers) {
    res.status(404).json({ message: 'Catégorie introuvable' });
  } else {
    res.status(200).json(customers);
  }
});

// Mettre à jour une catégorie par ID
app.put('/api/customer/:customer_id', (req, res) => {
  const customers = customer.find(c => c.customer_id === parseInt(req.params.customer_id));

  if (!customers) {
    res.status(404).json({ message: 'Catégorie introuvable' });
  } else {
    customers.first_name = req.body.first_name;
    customers.last_name = req.body.last_name;
    customers.email = req.body.email;
    customers.address = req.body.address;
    customers.zipcode = req.body.zipcode;
    customers.place = req.body.place;
    customers.phone = req.body.phone;
    customers.created_at = req.body.created_at;
    customers.paid_amount = req.body.paid_amount;
    customers.designer = req.body.designer;

    res.status(200).json(customers);
  }
});

// Supprimer une catégorie par ID
app.delete('/api/customer/:customer_id', (req, res) => {
  const customerIndex = customer.findIndex(c => c.customer_id === parseInt(req.params.customer_id));

  if (customerIndex === -1) {
    res.status(404).json({ message: 'Client introuvable' });
  } else {
    customer.splice(customerIndex, 1);

    res.sendStatus(204);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
