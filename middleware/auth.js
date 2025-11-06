import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // modèle Sequelize

const auth = async (req, res, next) => {
  try {
    // Vérifie la présence du header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token manquant dans les headers' });
    }

    // Le token est de la forme : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Format de token invalide (Bearer attendu)' });
    }

    // Vérifie le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    // Vérifie si l'utilisateur existe en base
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    // Ajoute les infos d’authentification à la requête
    req.auth = { userId: user.id, email: user.email };
    next();

  } catch (error) {
    console.error('Erreur d’authentification:', error);
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};

export default auth;
