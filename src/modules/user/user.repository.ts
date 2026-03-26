import User, { IUser } from "./user.model";

export const createUser = async (data: Partial<IUser>) => {
  return await User.create(data); // Create a new user
};

export const getAllUsers = async () => {
  return await User.find(); // Get all users
};

export const getUserById = async (id: string) => {
  return await User.findById(id); // Get a user by ID
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, data, { new: true }); // Update a user by ID
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id); // Delete a user by ID
};
