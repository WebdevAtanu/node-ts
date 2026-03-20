import { Request, Response } from "express";
import User from "../models/User";

// GET all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// UPDATE user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }, // return updated + validate
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Invalid update data" });
  }
};

// DELETE user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
