import express from 'express';
import { getProductController, postProductController } from '../controllers/product.controller';

const router = express.Router();

router.get('/', getProductController);

router.post('/', postProductController);

export default router;
