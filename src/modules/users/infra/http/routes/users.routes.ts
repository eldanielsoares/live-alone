import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AuthenticateSignUpController from '../controllers/AuthenticateSignUpController';
import CreateuserController from '../controllers/CreateUserController';

const usersRouter = Router();
const createUserController = new CreateuserController();
const authenticateSignUpController = new AuthenticateSignUpController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().length(5).required(),
    }).unknown(),
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(30).required(),
      accepted_terms: Joi.boolean().required(),
    }),
  }),
  createUserController.create,
);

usersRouter.post(
  '/auth-signup',
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
    }),
  }),
  authenticateSignUpController.create,
);
usersRouter.patch(
  '/auth-signup',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().length(5).required(),
    }).unknown(),
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
    }),
  }),
  authenticateSignUpController.update,
);

export default usersRouter;
