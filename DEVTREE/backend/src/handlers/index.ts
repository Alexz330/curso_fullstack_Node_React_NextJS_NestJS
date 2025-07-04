import { Request, Response } from "express";
import slug from "slug";
import { hashPassword, checkPassword } from "../utils/auth";
import User from "../models/User";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error("El usuario ya está registrado");
      error.name = "UserExistsError";
      res.status(409).json({ error: error.message });
      return;
    }

    const handle = slug(req.body.handle, "");
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

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "Un error inesperado ocurrió",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // Revisar si el usuario existe
    if (!user) {
      const error = new Error("Email o contraseña incorrectos");
      error.name = "UserNotFoundError";
      res.status(404).json({ error: error.message });
      return;
    }

    // Comprar el password
    const isPasswordCorrect = await checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Email o contraseña incorrectos");
      error.name = "UserNotFoundError";
      res.status(401).json({ error: error.message });
      return;
    }
    const token = generateJWT({ id: user._id });

    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Ocurrió un error inesperado",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
 res.json(req.user);
};
