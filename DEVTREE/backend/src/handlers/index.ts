import { Request, Response } from "express";
import { hashPassword } from "../utils/auth";

import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            const error = new Error("El usuario ya está registrado");
            error.name = "UserExistsError";
            res.status(409).json({ error: error.message });
            return
        }

        const user = new User(req.body);

        const hash = await hashPassword(user.password as string);

        user.password = hash;
        await user.save();
        console.log("Respuesta: usuario creado");

        res.status(201).json({ message: 'User created successfully', user: user.toObject() });
    } catch (error) {
        console.log("Respuesta: error al crear el usuario");
        res.status(400).json({
            error: error instanceof Error ? error.message : "An unknown error occurred"
        });
    }
};
