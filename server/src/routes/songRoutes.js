import { CreateNewSong, GetAllSong, DeleteSong, UpdateSong } from "../controller/admin/songController.js";
import express from 'express';
import { protect, admin } from "../middlewares/authMiddleware.js";
import upload from "../config/cloudinaryConfig.js";

const router = express.Router();

router.get('/', GetAllSong);

router.post('/',
    upload.fields([{ name: 'audioFile', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }]),
    CreateNewSong);

router.delete('/:id', DeleteSong);

router.put('/:id', UpdateSong);

export default router;