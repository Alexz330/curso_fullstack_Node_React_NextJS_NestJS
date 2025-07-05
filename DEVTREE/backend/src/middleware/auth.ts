import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { verifyJWT } from "../utils/jwt";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
      const error = new Error("No autorizado");
      error.name = "UnauthorizedError";
      res.status(401).json({ error: error.message });
      return;
    }
    const token = bearer?.split(" ")[1];
  
    if (!token) {
      const error = new Error("No autorizado");
      error.name = "UnauthorizedError";
      res.status(401).json({ error: error.message });
      return;
    }
    try {
      const result = verifyJWT(token);
      if (!result) {
        const error = new Error("No autorizado");
        error.name = "UnauthorizedError";
        res.status(401).json({ error: error.message });
        return;
      }
      if (typeof result === "object" && result.id) {
        const user = await User.findById(result.id).select("-password");
        if (!user) {
          const error = new Error("No autorizado");
          error.name = "UnauthorizedError";
          res.status(401).json({ error: error.message });
          return;
        }
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Token No valido",
      });
      return;
    }
};
