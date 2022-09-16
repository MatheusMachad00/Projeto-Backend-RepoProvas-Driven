import express from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { newTestSchema } from "../schemas/testSchema";
import { validateToken } from "../middlewares/validateToken";
import {
  createTest,
  getTestsByDiscipline,
  getTestsByTeacher
} from "../controllers/testController"


const router = express.Router();
router.use(validateToken);

router.post(
  "/test/create",
  validateSchemaMiddleware(newTestSchema),
  createTest
);

router.get(
  "/test/getByDiscipline",
  getTestsByDiscipline  
);

router.get(
  "/test/getByTeacher",
  getTestsByTeacher  
);

export default router;