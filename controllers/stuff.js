
import Thing from '../models/thing.js';

export const createThing = async (req, res, next) => {
  try {
    // Si tu utilises l’upload d’image (ex: avec Multer)
    let imageUrl = null;

    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    // Créer un nouvel objet à enregistrer dans la base PostgreSQL
    const thingData = {
      ...req.body,
      userId: req.auth.userId, // récupéré depuis le token JWT
      imageUrl: imageUrl,
    };

    // Création dans la base
    const thing = await Thing.create(thingData);

    res.status(201).json({
      message: 'Objet enregistré avec succès !',
      data: thing,
    });
  } catch (error) {
    console.error('Erreur lors de la création du Thing :', error);
    res.status(400).json({
      error: error.message || 'Erreur lors de l’enregistrement du Thing',
    });
  }
};

export const getOneThing = (req, res, next) => {
    try {
        const thing = Thing.findOne({ where: { id: req.params.id } });

        if (thing) {
            res.status(200).json(thing);
        } else {
            res.status(404).json({ message: '❌ Objet non rencontré.' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

export const modifyThing = (req, res, next) => {  
    /*try {
        const thing = Thing.update(
            { ...req.body },               
            { where: { id: req.params.id } }
        );

        if (thing) {
            res.status(200).json({ message: '✅ Objet modifié avec succès !' });
        } else {
            res.status(404).json({ message: '❌ Objet non rencontré.' });
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }*/

    try {
    // Récupération de l’objet depuis la base
    const thing = Thing.findByPk(req.params.id);

    if (!thing) {
      return res.status(404).json({ message: 'Objet non trouvé !' });
    }

    // Vérification que le user connecté est bien le propriétaire
    if (thing.userId !== req.auth.userId) {
      return res.status(403).json({ message: 'Non autorisé à modifier cet objet !' });
    }

    // Gestion du cas où une nouvelle image est envoyée
    let updatedData = { ...req.body };

    if (req.file) {
      // Supprimer l’ancienne image si elle existe
      if (thing.imageUrl) {
        const oldFilename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${oldFilename}`, (err) => {
          if (err) console.error('Erreur lors de la suppression de l’image précédente :', err);
        });
      }

      // Ajouter la nouvelle URL de l’image
      updatedData.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    // Mise à jour dans la base
    thing.update(updatedData);

    res.status(200).json({
      message: '✅ Objet modifié avec succès !',
      data: thing,
    });
  } catch (error) {
    console.error('Erreur lors de la modification du Thing :', error);
    res.status(400).json({
      error: error.message || 'Erreur lors de la modification du Thing',
    });
  }
};

export const deleteThing = (req, res, next) => {
    Thing.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({message: error.message}));
};

export const getAllThings = (req, res, next) => {
    Thing.findAll()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};