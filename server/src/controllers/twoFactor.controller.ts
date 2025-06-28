import { Request, Response, NextFunction } from 'express';
import { TwoFactorService } from '../services/twoFactor.service';

export const getBase64ImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const base64Image = await TwoFactorService.getSecretBase64Image();
    res.status(200).json(base64Image);
  } catch (error) {
    next(error);
  }
};

export const postUserTokenController = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userToken, secret } = req.body;
    const result = TwoFactorService.postUserToken(userToken, secret);

    if (result.verified) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    next(error);
  }
};

