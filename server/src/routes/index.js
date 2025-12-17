import express from 'express';
import songRoutes from './AdminRoute/songRoutes.js';
import userRoutes from './AdminRoute/userRoutes.js';
import albumRoutes from './AdminRoute/albumRoutes.js'

const router = express.Router();

router.use('/songs', songRoutes);
router.use('/users', userRoutes);
router.use('/albums', albumRoutes);

export default router;