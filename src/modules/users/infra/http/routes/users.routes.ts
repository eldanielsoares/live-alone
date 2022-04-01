import { Router } from 'express';
import AuthenticateSignUpController from '../controllers/AuthenticateSignUpController';
import CreateuserController from '../controllers/CreateUserController';

const usersRouter = Router();
const createUserController = new CreateuserController();
const authenticateSignUpController = new AuthenticateSignUpController();

usersRouter.post('/', createUserController.create);

usersRouter.post('/auth-signup', authenticateSignUpController.create);
usersRouter.patch('/auth-signup', authenticateSignUpController.update);

export default usersRouter;
