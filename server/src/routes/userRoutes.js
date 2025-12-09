import { CreateNewUser, GetAllUsers, DeleteUser, UpdateUser, Login } from "../controller/admin/userController.js";
import express from 'express';
import upload from "../config/cloudinaryConfig.js";

const router = express.Router();

router.post('/', upload.fields([{ name: 'avatar', maxCount: 1 }]), CreateNewUser);
router.get('/', GetAllUsers);
router.delete('/:id', DeleteUser);
router.put('/:id', UpdateUser);
router.post('/login', Login);

export default router;