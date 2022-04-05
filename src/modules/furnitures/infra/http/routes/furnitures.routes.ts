import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticaded';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import FurnituresControllers from '../controllers/FurnituresControllers';

const furnitures_routes = Router();

const furnituresControllers = new FurnituresControllers();

furnitures_routes.use(ensureAuthenticated);

furnitures_routes.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object({
      price: Joi.number().required(),
      bought: Joi.boolean().required(),
      name: Joi.string().required(),
    }),
  }),
  furnituresControllers.create,
);

furnitures_routes.get('/', furnituresControllers.index);

furnitures_routes.delete(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object({
      id: Joi.string().required(),
    }).unknown(),
  }),
  furnituresControllers.delete,
);

furnitures_routes.patch(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object({
      id: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object({
      price: Joi.number().required(),
      bought: Joi.boolean().required(),
      name: Joi.string().required(),
    }),
  }),
  furnituresControllers.update,
);

export default furnitures_routes;
