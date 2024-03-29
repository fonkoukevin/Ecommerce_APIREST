const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser')

// Tableau de catégories

const orderitems = [
  {
    custom_id: 1, design_id:55 , designer_id: 45, designer_paid: 35, age_segment:18 - 19 , price:12 , quantity:45   },
     
    {
      custom_id: 2, design_id:54 , designer_id: 44, designer_paid: 34, age_segment:17 - 16 , price:19 , quantity:10   },
  {
    custom_id: 3, design_id:53 , designer_id: 43, designer_paid: 33, age_segment:15 - 13 , price:20 , quantity:30   },
 
];

// Middleware pour parser les requêtes avec un corps JSON
app.use(express.json());

// Route pour obtenir toutes les catégories
app.get('/api/orderitems', (req, res) => {
  res.json(orderitems);
});

// Route pour obtenir une catégorie par son ID
app.get('/api/orderitems/:orderitem_id', (req, res) => {
  const orderitem = orderitems.find(c => c.orderitem_id === parseInt(req.params.orderitem_id));
  if (orderitem) {
    res.json(orderitem);
  } else {
    res.status(404).send('Catégorie non trouvée');
  }
});

// Route pour ajouter une nouvelle catégorie
app.post('/api/orderitems/:orderitem_id', (req, res) => {
  const orderitemIndex = categories.findIndex(c => c.orderitem_id === parseInt(req.params.orderitem_id));
  const neworderitem = req.body;
  
  if (orderitemIndex !== -1) {
    orderitems[orderitemsIndex] = {...orderitems[orderitemsIndex], ...orderitems};
    res.sendStatus(204);
  } else {
    // Si la catégorie n'existe pas, ajouter une nouvelle catégorie
    if (typeof neworderitem === 'object' && neworderitem !== null) {
      neworderitem.orderitem_id = orderitems.length + 1;
      orderitems.push(neworderitem);
      res.status(201).json(newCategory);
    } else {
      res.status(400).send('La catégorie doit être un objet JSON valide');
    }
  }
});


// Route pour mettre à jour une catégorie
app.put('/api/orderitems/:orderitem_id', (req, res) => {
  const orderitemIndex = orderitems.findIndex(c => c.orderitem_id === parseInt(req.params.orderitem_id));
  if (orderitemIndex !== -1) {
    orderitems[orderitemIndex] = {...orderitems[orderitemsIndex], ...req.body};
    res.sendStatus(204);
  } else {
    res.status(404).send('Catégorie non trouvée');
  }
});

// Route pour supprimer une catégorie
app.delete('/api/orderitems/:orderitem_id', (req, res) => {
  const orderitemIndex = orderitems.findIndex(c => c.orderitem_id === parseInt(req.params.orderitem_id));
  if (orderitemIndex !== -1) {
    orderitems.splice(orderitemIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Catégorie non trouvée');
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
3