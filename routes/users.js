import { Router } from 'express';
import { getMe, updateUserInfo } from '../controllers/users.js';
import { validateUpdateUserInfo } from '../validators/users.js';

const usersRouter = Router();

usersRouter.get('/me', getMe);

usersRouter.patch('/me', validateUpdateUserInfo, updateUserInfo);

export default usersRouter;
