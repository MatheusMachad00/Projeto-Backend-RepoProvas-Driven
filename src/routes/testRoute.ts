import express from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { newTestSchema } from "../schemas/testSchema";
import { validateToken } from "../middlewares/validateToken";


const router = express.Router();
router.use(validateToken);

router.post(
  "/test/create",
  validateSchemaMiddleware(newTestSchema),

);

/* router.post(
  "/signup",
  validateSchemaMiddleware(signupSchema),
  signup  
); */

export default router;