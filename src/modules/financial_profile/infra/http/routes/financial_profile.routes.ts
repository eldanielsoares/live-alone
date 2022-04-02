import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticaded';
import { Router } from 'express';
import FinancialProfileControllers from '../controllers/FinancialProfileControllers';

const financial_profile_routes = Router();
const financialProfileControllers = new FinancialProfileControllers();
financial_profile_routes.use(ensureAuthenticated);

financial_profile_routes.get('/', financialProfileControllers.index);
financial_profile_routes.post('/', financialProfileControllers.create);
financial_profile_routes.put('/', financialProfileControllers.update);

export default financial_profile_routes;
