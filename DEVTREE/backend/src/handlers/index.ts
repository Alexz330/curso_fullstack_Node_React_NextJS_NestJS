import User from "../models/User";
import { Request, Response } from "express";

export const createAccount = async (req: Request, res: Response) => {
    const { email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        const error = new Error("El usuario ya está registrado");
        error.name = "UserExistsError";
        res.status(409).json({ error: error.message });
    }

    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
