import type { InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod/v4';

export const users = pgTable('users', {
  firebaseUid: text('firebase_uid').notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  isAdmin: boolean('is_admin').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const SelectUserSchema = createSelectSchema(users, {
  email: (schema) => schema.email(),
});

// Schema for creating/syncing Firebase users in local DB
export const SyncUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email(),
}).pick({
  firebaseUid: true,
  name: true,
  email: true,
  isAdmin: true,
});

// Schema for updating user profile (no password, no firebaseUid changes)
export const UpdateUserSchema = createUpdateSchema(users).pick({
  name: true,
});

// Schema for user deletion (by Firebase UID)
export const DeleteUserSchema = SelectUserSchema.pick({
  firebaseUid: true,
});

export type User = InferSelectModel<typeof users>;
export type SelectUser = z.infer<typeof SelectUserSchema>;
export type SyncUser = z.infer<typeof SyncUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type DeleteUser = z.infer<typeof DeleteUserSchema>;
