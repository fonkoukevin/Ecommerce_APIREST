const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser les requêtes avec un body JSON
app.use(express.json());

// Simulation de la base de données pour stocker les designers
let designImage = [
  {
    designImage_id: 1,
    design_id: 123,
    image: 'DesignImg.png',
    thumbnail: 'Graves-miniature.png'
  },
  {
    designImage_id: 1,
    design_id: 123,
    image: 'DesignImg.png',
    thumbnail: 'Graves-miniature.png'
  }
];

// Récupérer tous les designers
app.get('/api/designImage', (req, res) => {
  res.status(200).json(designImage);
});

// Ajouter un nouveau designer
app.post('/api/designImage', (req, res) => {
  const newDesignI = {
    designImage_id: req.body.designImage,
    design_id: req.body.design_id,
    image: req.body.image,
    thumbnail: req.body.thumbnail
  };

  designImage.push(newDesignI);

  res.status(201).json(newDesignI);
});

// Récupérer un designer par ID
app.get('/api/designImage/:designImage_id', (req, res) => {
  const designImg = designImage.find(d => d.designImage_id === parseInt(req.params.designImage_id));

  if (!designImg) {
    res.status(404).json({ message: 'DesignImg introuvable' });
  } else {
    res.status(200).json(designImg);
  }
});

// Mettre à jour un designer par ID
app.put('/api/designImage/:designImage_id', (req, res) => {
  const designImgs = designImage.find(d => d.designImage_id === parseInt(req.params.designImage_id));

  if (!designImgs) {
    res.status(404).json({ message: 'DesignImg introuvable' });
  } else {
    designImgs.designImage_id = req.body.designImage_id;
    designImgs.design_id = req.body.design_id;
    designImgs.image = req.body.image;
    designImgs.thumbnail = req.body.thumbnail;

    res.status(200).json(designImgs);
  }
});

// Supprimer un designer par ID
app.delete('/api/designImage/:designImage_id', (req, res) => {
  const designIndex = designImage.findIndex(d => d.designImage_id === parseInt(req.params.designImage_id));

  if (designIndex === -1) {
    res.status(404).json({ message: 'Designer introuvable' });
  } else {
    designImage.splice(designIndex, 1);

    res.sendStatus(204);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
