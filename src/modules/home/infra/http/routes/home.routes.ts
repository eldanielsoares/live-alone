import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticaded';
import { Router } from 'express';
import HomeController from '../controllers/HomeController';

const homeRoutes = Router();

const homeoController = new HomeController();

homeRoutes.use(ensureAuthenticated);

homeRoutes.get('/', homeoController.index);

export default homeRoutes;
