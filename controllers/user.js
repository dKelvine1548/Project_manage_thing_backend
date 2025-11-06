import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const signup = (req, res, next) => { 
    try{
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const login = (req, res, next) => {

    try{
        User.findOne({ where: { email: req.body.email }})
       .then(user => {
           if (!user) {
               return res.status(401).json({ message: 'email ou mot de passe incorrect'});
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'email ou mot de passe incorrect' });
                   }
                   res.status(200).json({
                       userId: user.id,
                       token: jwt.sign(
                           { userId: user.id },
                           'RANDOM_TOKEN_SECRET',
                           { expiresIn: '24h' }
                       )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
    }catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    
}