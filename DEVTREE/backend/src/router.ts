import { Router } from "express";
import { createAccount } from "./handlers";
import { check } from "express-validator";
const router = Router();
/** Autenticacion y registro  */

router.post(
  "/auth/register",
  check("email")
    .isEmail()
    .withMessage("Por favor ingresa un correo electrónico válido"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Por favor ingresa una contraseña con al menos 6 caracteres"),
  check("handle")
    .isLength({ min: 3 })
    .withMessage(
      "Por favor ingresa un nombre de usuario con al menos 3 caracteres"
    ),
  createAccount
);

export default router;
