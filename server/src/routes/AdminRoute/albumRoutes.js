import express from 'express'
import { GetAllAlbum, DeleteAlbum, AddNewAlbum } from '../../controller/admin/albumController.js';
import upload from "../../config/cloudinaryConfig.js";

const router = express.Router();

router.post('/', upload.fields([{ name: 'coverImage', maxCount: 1 }]), AddNewAlbum);
router.get("/", GetAllAlbum);
router.delete("/:id", DeleteAlbum);

export default router;