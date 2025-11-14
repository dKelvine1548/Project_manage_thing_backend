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


export default app;