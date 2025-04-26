import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export const getProductController = (req: Request, res: Response, next: Function) => {
  try {
    const product = ProductService.getProdcut();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const postProductController = (req: Request, res: Response, next: Function) => {
  try {
    const product = ProductService.postProdcut(req.body.product);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
