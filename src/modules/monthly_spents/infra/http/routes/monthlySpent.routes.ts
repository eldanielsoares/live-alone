import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticaded';
import { Router } from 'express';
import CreateMonthlySpentController from '../controllers/CreateMonthlySpentController';

const monthlySpentRoutes = Router();
monthlySpentRoutes.use(ensureAuthenticated);
const monthlySpentController = new CreateMonthlySpentController();

monthlySpentRoutes.get('/', monthlySpentController.index);
monthlySpentRoutes.post('/', monthlySpentController.create);
monthlySpentRoutes.delete('/', monthlySpentController.delete);

export default monthlySpentRoutes;
