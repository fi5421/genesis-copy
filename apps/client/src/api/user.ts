import { request } from '../utils/request';

export interface ServerUser {
  firebaseUid: string;
  name: string;
  email: string;
  isAdmin: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfileResponse {
  user: ServerUser;
  firebaseData: {
    uid: string;
    email: string;
    emailVerified: boolean;
  };
}

export interface SyncUserRequest {
  firebaseUid: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface UpdateUserRequest {
  name: string;
}

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  return request<UserProfileResponse>('/user/');
};

export const syncUser = async (
  userData: SyncUserRequest,
): Promise<{ message: string; user: ServerUser }> => {
  return request('/user/sync', {
    method: 'POST',
    body: userData,
  });
};

export const updateUser = async (
  updateData: UpdateUserRequest,
): Promise<{ message: string; user: ServerUser }> => {
  return request('/user/update', {
    method: 'PUT',
    body: updateData,
  });
};

export const deleteUser = async (
  firebaseUid: string,
): Promise<{ message: string; user: ServerUser }> => {
  return request('/user/remove', {
    method: 'DELETE',
    body: { firebaseUid },
  });
};
