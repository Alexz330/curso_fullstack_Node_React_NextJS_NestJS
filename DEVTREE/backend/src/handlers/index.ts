import { Request, Response } from "express";
import slug from "slug";
import { hashPassword } from "../utils/auth";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            const error = new Error("El usuario ya está registrado");
            error.name = "UserExistsError";
            res.status(409).json({ error: error.message });
            return;
        }

        const handle = slug(req.body.handle, '');
        const handleExists = await User.findOne({ handle });

        if (handleExists) {
            const error = new Error("Nombre de usuario no disponible");
            error.name = "UserExistsError";
            res.status(409).json({ error: error.message });
            return;
        }

        const user = new User(req.body);

        const hash = await hashPassword(user.password as string);

        user.password = hash;
        user.handle = handle;


        await user.save();

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : "Un error inesperado ocurrió"
        });
    }
};
