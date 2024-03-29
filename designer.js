const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser les requêtes avec un body JSON
app.use(express.json());

// Simulation de la base de données pour stocker les designers
let designers = [
  {
    designer_id: 1,
    user_id: 123,
    name: 'Designer 1',
    created_at: '2023-04-05T14:48:00.000Z'
  },
  {
    designer_id: 2,
    user_id: 456,
    name: 'Designer 2',
    created_at: '2023-04-05T15:00:00.000Z'
  }
];

// Récupérer tous les designers
app.get('/api/designers', (req, res) => {
  res.status(200).json(designers);
});

// Ajouter un nouveau designer
app.post('/api/designers', (req, res) => {
  const newDesigner = {
    designer_id: req.body.designer_id,
    user_id: req.body.user_id,
    name: req.body.name,
    created_at: req.body.created_at
  };

  designers.push(newDesigner);

  res.status(201).json(newDesigner);
});

// Récupérer un designer par ID
app.get('/api/designers/:designer_id', (req, res) => {
  const designer = designers.find(d => d.designer_id === parseInt(req.params.designer_id));

  if (!designer) {
    res.status(404).json({ message: 'Designer introuvable' });
  } else {
    res.status(200).json(designer);
  }
});

// Mettre à jour un designer par ID
app.put('/api/designers/:designer_id', (req, res) => {
  const designer = designers.find(d => d.designer_id === parseInt(req.params.designer_id));

  if (!designer) {
    res.status(404).json({ message: 'Designer introuvable' });
  } else {
    designer.user_id = req.body.user_id;
    designer.name = req.body.name;
    designer.created_at = req.body.created_at;

    res.status(200).json(designer);
  }
});

// Supprimer un designer par ID
app.delete('/api/designers/:designer_id', (req, res) => {
  const designerIndex = designers.findIndex(d => d.designer_id === parseInt(req.params.designer_id));

  if (designerIndex === -1) {
    res.status(404).json({ message: 'Designer introuvable' });
  } else {
    designers.splice(designerIndex, 1);

    res.sendStatus(204);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
