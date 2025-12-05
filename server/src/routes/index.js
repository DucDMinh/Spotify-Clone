import express from 'express';
import songRoutes from './songRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/songs', songRoutes);
router.use('/users', userRoutes);

export default router;