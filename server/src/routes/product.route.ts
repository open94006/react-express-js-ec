import express from 'express';
import {
  getProductController,
  getProductListController,
  postProductController,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', getProductController);

router.get('/list', getProductListController);

router.post('/', postProductController);

export default router;
