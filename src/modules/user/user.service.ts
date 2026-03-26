import * as userRepo from "./user.repository";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";

export const getUser = async (id: string) => {
  const user = await userRepo.getUserById(id); // Get the user by ID from the repository
  if (!user) throw new Error("User not found"); // Throw an error if the user is not found
  return user;
};

export const createUser = async (data: CreateUserDTO) => {
  return await userRepo.createUser(data); // Return the created user object from the repository
};

export const getUsers = async () => {
  return await userRepo.getAllUsers(); // Return all users from the repository
};

export const updateUser = async (id: string, data: UpdateUserDTO) => {
  const user = await userRepo.updateUser(id, data); // Update the user by ID from the repository
  if (!user) throw new Error("User not found"); // Throw an error if the user is not found
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await userRepo.deleteUser(id); // Delete the user by ID from the repository
  if (!user) throw new Error("User not found"); // Throw an error if the user is not found
  return user;
};
