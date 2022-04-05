import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticaded';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import FinancialProfileControllers from '../controllers/FinancialProfileControllers';

const financial_profile_routes = Router();
const financialProfileControllers = new FinancialProfileControllers();
financial_profile_routes.use(ensureAuthenticated);

financial_profile_routes.get('/', financialProfileControllers.index);

financial_profile_routes.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object({
      monthly_income: Joi.number().required(),
      monthly_spent: Joi.number().required(),
      job_type: Joi.string().required(),
      current_emergency_reserve: Joi.number().required(),
    }),
  }),
  financialProfileControllers.create,
);

financial_profile_routes.put(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object({
      monthly_income: Joi.number().required(),
      monthly_spent: Joi.number().required(),
      job_type: Joi.string().required(),
      current_emergency_reserve: Joi.number().required(),
    }),
  }),
  financialProfileControllers.update,
);

export default financial_profile_routes;
