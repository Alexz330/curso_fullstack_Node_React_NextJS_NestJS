import { Request, Response } from "express";
import slug from "slug";
import formidable from "formidable";
import { v4 as uuid } from "uuid";

import { hashPassword, checkPassword } from "../utils/auth";
import User from "../models/User";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

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

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description, links } = req.body;
    const handle = slug(req.body.handle, "");
    const handleExists = await User.findOne({ handle });
    if (handleExists && handleExists.email !== req.user!.email) {
      const error = new Error("Nombre de usuario no disponible");
      error.name = "UserExistsError";
      res.status(409).json({ error: error.message });
      return;
    }

    req.user!.description = description;
    req.user!.handle = handle;
    req.user!.links = links;
    await req.user!.save();
    res.status(200).json({ message: "Perfil actualizado exitosamente" });
  } catch (e) {
    const error = new Error("Hubo un error");
    res.status(500).json({ error: error.message });
    return;
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false });
  try {
    form.parse(req, async (err, fields, files) => {
      if (!files.file) {
        const error = new Error("No se subio ninguna imagen");
        error.name = "FileNotFoundError";
        res.status(404).json({ error: error.message });
        return;
      }

      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuid() },
        async function (err, result) {
          if (err) {
            const error = new Error("Error subiendo la imagen");
            error.name = "UploadError";
            res.status(500).json({ error: error.message });
            return;
          }
          if (result) {
            req.user!.image = result.secure_url;
            await req.user!.save();
            res.status(200).json({ image: result.secure_url });
            return;
          }
        }
      );
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Error subiendo la imagen" });
  }
};


export const getUserByHandle = async (req: Request, res: Response) => {
  try {
   const { handle } = req.params;
   const user = await User.findOne({ handle }).select("-_id -__v -email -password");
   if (!user) {
    const error = new Error("Usuario no encontrado");
    error.name = "UserNotFoundError";
    res.status(404).json({ error: error.message });
    return;
   }
   res.json(user);
   return;
    
  } catch ( e) {
    const error = new Error("Hubo un error"); 
    res.status(500).json({ error: error.message });
    return;
  }
};

export const searchByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.body;
    const userExist = await User.findOne({ handle });
    if (userExist) {
     const error = new Error(`${handle} ya está registrado`);
     error.name = "UserExistsError";
     res.status(409).json({ error: error.message });
     return;
    }
    res.json({ message:`${handle} esta disponible` });
    return;
  } catch (e) {
    const error = new Error("Hubo un error");
    res.status(500).json({ error: error.message });
    return;
  }
};
  