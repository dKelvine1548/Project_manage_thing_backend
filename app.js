import express from 'express';  
import sequelize from './db.js';
import stuffRoutes from './routes/stuff.js';
import userRoutes from './routes/user.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.json());  

sequelize.authenticate()
  .then(() => console.log('✅ Connecté à PostgreSQL'))
  .then(() => sequelize.sync({ alter: true }))
  .then(() => console.log('✅ Tables synchronisées'))
  .catch(err => console.error('❌ Erreur de connexion :', err)); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*' );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

/*app.post('/api/stuff', (req, res, next) => {
  try {
    const thing = Thing.create(req.body);
    res.status(201).json({ message: 'Objet enregistré !', data: thing });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


app.get('/api/stuff/:id', async (req, res) => {
  try {
    const thing = await Thing.findOne({ where: { id: req.params.id } });

    if (thing) {
      res.status(200).json(thing);
    } else {
      res.status(404).json({ message: '❌ Objet non trouvé.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/stuff', (req, res, next) => {
  Thing.findAll()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/stuff/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await Thing.update(
      { ...req.body },               // ✅ les nouvelles valeurs
      { where: { id: id } }          // ✅ la condition WHERE
    );

    if (updated) {
      res.status(200).json({ message: '✅ Objet modifié avec succès !' });
    } else {
      res.status(404).json({ message: '❌ Objet non trouvé.' });
    }

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}); */




//la fonction next permet de passer au middleware suivant
/*app.use((req, res, next) => {
    console.log("Requête reçue");
    next();
})

app.use((res, req, next) => {
    res.statusCode = 203;
    next();
})

app.use((req, res, next)=> {
    res.json({ message: "Votre requête a bien été reçue !" })
    next();
});

app.use((req, res, next)=> {
    console.log("Réponse envoyée avec succès")
}); */

/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*' );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 49,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 28,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
}); 

app.post('/api/stuff', (req, res, next)=>{
  console.log(req.body);
  res.status(201).json({message: 'objet créé !'});
}) */

  
//module.exports = app;
export default app;