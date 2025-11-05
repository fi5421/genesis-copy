import { type NextFunction, type Request, type Response } from 'express';
import {
  type User,
  SyncUserSchema,
  UpdateUserSchema,
  DeleteUserSchema,
} from '../../db/schema/user';
import {
  deleteUser,
  updateUser,
  ensureUserExists,
  syncFirebaseUser,
} from './user.service';
import { ServerError } from '../../utils/errors';

export const handleSyncUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = SyncUserSchema.parse(req.body);

    const { user } = await syncFirebaseUser(validatedData);

    res.status(200).json({
      message: 'User synced successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = DeleteUserSchema.parse(req.body);
    const { firebaseUid } = validatedData;

    const { user } = res.locals as { user: User };

    if (user.firebaseUid !== firebaseUid && !user.isAdmin) {
      throw new ServerError('UNAUTHORIZED', {
        message: 'You are not authorized to delete this user',
      });
    }

    const deletedUser = await deleteUser(firebaseUid);

    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firebaseUser } = res.locals as {
      firebaseUser: {
        uid: string;
        email: string;
        email_verified: boolean;
      };
    };

    const syncedUser = await ensureUserExists(firebaseUser.uid);

    res.status(200).json({
      user: syncedUser,
      firebaseData: firebaseUser,
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = UpdateUserSchema.parse(req.body);
    const { user } = res.locals as { user: User };

    const updatedUser = await updateUser(user, validatedData);

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
