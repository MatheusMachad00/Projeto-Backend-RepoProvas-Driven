import { Router } from 'express';
import authRouter from './authRouter'
import testRouter from './testRoute'


const router = Router();

router.use(authRouter);
router.use(testRouter);

export default router;