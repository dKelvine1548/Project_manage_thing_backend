import express from 'express';
import * as stuffCtrl from '../controllers/stuff.js';
import auth from '../middleware/auth.js';
import multer from '../middleware/multer-config.js';

const stuffRoutes = express.Router();

stuffRoutes.get('/', stuffCtrl.getAllThings);
stuffRoutes.post('/', auth, multer, stuffCtrl.createThing);
stuffRoutes.get('/:id', auth, stuffCtrl.getOneThing);
stuffRoutes.put('/:id', auth, stuffCtrl.modifyThing);
stuffRoutes.delete('/:id', auth, stuffCtrl.deleteThing);

export default stuffRoutes;