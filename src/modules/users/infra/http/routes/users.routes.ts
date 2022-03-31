import { Router } from 'express';
import CreateuserController from '../controllers/CreateUserController';

const usersRouter = Router();
const createUserController = new CreateuserController();

usersRouter.post('/', createUserController.create);

export default usersRouter;
