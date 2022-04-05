import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticaded';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CreateMonthlySpentController from '../controllers/CreateMonthlySpentController';

const monthlySpentRoutes = Router();
monthlySpentRoutes.use(ensureAuthenticated);
const monthlySpentController = new CreateMonthlySpentController();

monthlySpentRoutes.get('/', monthlySpentController.index);
monthlySpentRoutes.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      type: Joi.string().required(),
      amount: Joi.number().required(),
    }),
  }),
  monthlySpentController.create,
);
monthlySpentRoutes.delete(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object({
      id: Joi.string().required(),
    }).unknown(),
  }),
  monthlySpentController.delete,
);

export default monthlySpentRoutes;
