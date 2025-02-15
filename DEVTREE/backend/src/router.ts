import { Router } from "express";
const router = Router();
/** Autenticacion y registro  */

router.get("/auth/register", (req, res) => {
  res.send("Hello World!");
});


export default router;