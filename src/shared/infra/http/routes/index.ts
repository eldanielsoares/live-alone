import monthlySpentRoutes from '@modules/monthly_spents/infra/http/routes/monthlySpent.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/monthly-spents', monthlySpentRoutes);

export default routes;
