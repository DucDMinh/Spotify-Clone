import { CreateNewUser, GetAllUsers, DeleteUser, UpdateUser, Login } from "../controller/admin/userController.js";
import express from 'express';

const router = express.Router();

router.post('/', CreateNewUser);
router.get('/', GetAllUsers);
router.delete('/:id', DeleteUser);
router.put('/:id', UpdateUser);
router.post('/login', Login);

export default router;