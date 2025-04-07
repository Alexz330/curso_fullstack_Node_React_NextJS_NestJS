import User from "../models/User";
import { Request, Response } from "express";

export const createAccount = async (req:Request, res:Response) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};