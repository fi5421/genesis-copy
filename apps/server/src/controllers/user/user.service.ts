import { eq } from 'drizzle-orm';
import {
  SyncUser,
  type UpdateUser,
  type User,
  users,
} from '../../db/schema/user';
import { db } from '../../db/db';
import { ServerError } from '../../utils/errors';
import { firebaseAuth } from '../../utils/firebase';

export const getUserByUserId = async (firebaseUid: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.firebaseUid, firebaseUid))
    .limit(1);
  return user;
};

export const getUserByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user;
};

export const ensureUserExists = async (firebaseUid: string) => {
  let user = await getUserByUserId(firebaseUid);

  if (!user) {
    try {
      const firebaseUser = await firebaseAuth.getUser(firebaseUid);
      const userData = {
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email!,
        isAdmin: false,
      };

      const result = await syncFirebaseUser(userData);
      user = result.user;
    } catch {
      throw new ServerError('USER_NOT_FOUND', {
        message: 'Firebase user not found',
      });
    }
  }

  return user;
};

export const deleteUser = async (firebaseUid: string) => {
  const user = await getUserByUserId(firebaseUid);

  if (!user) throw new ServerError('USER_NOT_FOUND');

  const [deletedUser] = await db
    .delete(users)
    .where(eq(users.firebaseUid, firebaseUid))
    .returning({
      firebaseUid: users.firebaseUid,
      name: users.name,
      email: users.email,
    });

  return deletedUser;
};

export const updateUser = async (user: User, updateData: UpdateUser) => {
  const [updatedUser] = await db
    .update(users)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(users.firebaseUid, user.firebaseUid))
    .returning({
      firebaseUid: users.firebaseUid,
      name: users.name,
      email: users.email,
      isAdmin: users.isAdmin,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  if (!updatedUser) {
    throw new ServerError('USER_NOT_FOUND', {
      message: 'User could not be updated',
    });
  }

  return updatedUser;
};

export const syncFirebaseUser = async (userData: SyncUser) => {
  const existingUser = await getUserByUserId(userData.firebaseUid);

  if (existingUser) {
    const [updatedUser] = await db
      .update(users)
      .set({
        name: userData.name,
        email: userData.email,
        updatedAt: new Date(),
      })
      .where(eq(users.firebaseUid, userData.firebaseUid))
      .returning({
        firebaseUid: users.firebaseUid,
        name: users.name,
        email: users.email,
        isAdmin: users.isAdmin,
        deletedAt: users.deletedAt,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    if (!updatedUser) {
      throw new ServerError('INTERNAL_ERROR', {
        message: 'Failed to update user',
      });
    }

    return { user: updatedUser };
  }

  const [newUser] = await db
    .insert(users)
    .values({
      firebaseUid: userData.firebaseUid,
      name: userData.name,
      email: userData.email,
      isAdmin: userData.isAdmin || false,
    })
    .returning({
      firebaseUid: users.firebaseUid,
      name: users.name,
      email: users.email,
      isAdmin: users.isAdmin,
      deletedAt: users.deletedAt,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  if (!newUser) {
    throw new ServerError('INTERNAL_ERROR', {
      message: 'Failed to create user',
    });
  }

  return { user: newUser };
};
