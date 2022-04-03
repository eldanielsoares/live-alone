import financial_profile_routes from '@modules/financial_profile/infra/http/routes/financial_profile.routes';
import furnitures_routes from '@modules/furnitures/infra/http/routes/furnitures.routes';
import homeRoutes from '@modules/home/infra/http/routes/home.routes';
import monthlySpentRoutes from '@modules/monthly_spents/infra/http/routes/monthlySpent.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/monthly-spents', monthlySpentRoutes);
routes.use('/financial-profile', financial_profile_routes);
routes.use('/furnitures', furnitures_routes);
routes.use('/home', homeRoutes);

export default routes;
