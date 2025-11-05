import { Request, Response, NextFunction } from 'express';
import { ensureUserExists } from '../controllers/user/user.service';
import { ServerError } from '../utils/errors';
import { firebaseAuth } from '../utils/firebase';
import { FirebaseError } from 'firebase-admin/app';

export function authenticate(
  { verifyAdmin } = {
    verifyAdmin: false,
  },
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new ServerError('UNAUTHORIZED', {
          message: 'Authorization header not found',
        });
      }

      const token = authorization.split(' ')[1];

      if (!token) {
        throw new ServerError('UNAUTHORIZED', {
          message: 'Token not found',
        });
      }

      const decodedToken = await firebaseAuth.verifyIdToken(token);

      const user = await ensureUserExists(decodedToken.uid);

      if (verifyAdmin && !user.isAdmin) {
        throw new ServerError('UNAUTHORIZED', {
          message: 'User not authorized',
        });
      }

      res.locals.user = user;
      res.locals.firebaseUser = decodedToken;
      next();
    } catch (err: unknown) {
      const error = err as FirebaseError;
      if (
        error.code === 'auth/id-token-expired' ||
        error.code === 'auth/argument-error' ||
        error.code === 'auth/invalid-argument'
      ) {
        next(
          new ServerError('UNAUTHORIZED', {
            message: 'Invalid or expired token',
          }),
        );
      } else {
        next(error);
      }
    }
  };
}
