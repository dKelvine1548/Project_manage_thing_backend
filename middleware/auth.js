import jwt from 'jsonwebtoken';
import User from '../models/user.js'; 

const auth = async (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token manquant dans les headers' });
    }

    
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Format de token invalide (Bearer attendu)' });
    }

    
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

  
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    
    req.auth = { userId: user.id, email: user.email };
    next();

  } catch (error) {
    console.error('Erreur d’authentification:', error);
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};

export default auth;
