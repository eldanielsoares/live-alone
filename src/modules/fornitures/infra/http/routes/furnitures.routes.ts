import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticaded';
import { Router } from 'express';
import FurnituresControllers from '../controllers/FurnituresControllers';

const furnitures_routes = Router();

const furnituresControllers = new FurnituresControllers();

furnitures_routes.use(ensureAuthenticated);

furnitures_routes.post('/', furnituresControllers.create);
furnitures_routes.get('/', furnituresControllers.index);
furnitures_routes.delete('/', furnituresControllers.delete);
furnitures_routes.patch('/', furnituresControllers.update);

export default furnitures_routes;
