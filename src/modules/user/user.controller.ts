import { Request, Response } from "express";
import * as userService from "./user.service";
import { successResponse, errorResponse } from "../../utils/response";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the user ID from the request

    if (!id) {
      return errorResponse(res, "User ID is required", null, 400); // Bad Request response if ID is missing
    }

    const user = await userService.getUser(id); // Get the user by ID from the service

    return successResponse(res, "User fetched successfully", user); // Return a success response with the user
  } catch (error: any) {
    return errorResponse(res, error.message); // Return an error response if an error occurs
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body); // Create a user using the user service
    return successResponse(res, "User created", user, 201); // Return a success response with the created user
  } catch (error: any) {
    return errorResponse(res, error.message); // Return an error response if an error occurs
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers(); // Get all users using the user service
    return successResponse(res, "Users fetched", users); // Return a success response with the users
  } catch (error: any) {
    return errorResponse(res, error.message); // Return an error response if an error occurs
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the user ID from the request

    if (!id) {
      return errorResponse(res, "User ID is required", null, 400); // Bad Request response if ID is missing
    }

    const user = await userService.updateUser(id, req.body); // Update the user using the user service

    return successResponse(res, "User updated", user); // Return a success response with the updated user
  } catch (error: any) {
    return errorResponse(res, error.message); // Return an error response if an error occurs
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the user ID from the request

    if (!id) {
      return errorResponse(res, "User ID is required", null, 400); // Bad Request response if ID is missing
    }

    await userService.deleteUser(id); // Delete the user using the user service

    return successResponse(res, "User deleted"); // Return a success response
  } catch (error: any) {
    return errorResponse(res, error.message); // Return an error response if an error occurs
  }
};
