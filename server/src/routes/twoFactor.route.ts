import express from 'express';
import { getBase64ImageController, postUserTokenController } from '../controllers/twoFactor.controller';

const router = express.Router();

router.get('/', getBase64ImageController);

router.post('/', postUserTokenController);

export default router;
