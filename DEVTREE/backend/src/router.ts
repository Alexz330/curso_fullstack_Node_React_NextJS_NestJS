import { Router } from "express";
import { createAccount, getUser, login, updateProfile, uploadImage } from "./handlers";
import { check, body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";
const router = Router();
/** Autenticacion y registro  */

router.post(
  "/auth/register",
  check("name")
    .isLength({ min: 3 })
    .withMessage("Por favor ingresa un nombre con al menos 3 caracteres"),
  check("email")
    .isEmail()
    .withMessage("Por favor ingresa un correo electrónico válido"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Por favor ingresa una contraseña con al menos 6 caracteres"),
  check("handle")
    .isLength({ min: 3 })
    .withMessage(
      "Por favor ingresa un handle de usuario con al menos 3 caracteres"
    ),
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  check("email")
    .isEmail()
    .withMessage("Por favor ingresa un correo electrónico válido"),
  check("password").notEmpty().withMessage("EL password es obligatorio"),
  handleInputErrors,
  login
);

router.get("/user", authenticate, getUser);

router.patch(
  "/user",

  body("handle").notEmpty().withMessage("El handle es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  handleInputErrors,

  authenticate,
  updateProfile
);

router.post('/user/image', authenticate, uploadImage )
    
export default router;
