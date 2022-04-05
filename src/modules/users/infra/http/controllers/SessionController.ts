import AuthenticateService from '@modules/users/services/AutheticateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToPlain } from 'class-transformer';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUser = container.resolve(AuthenticateService);

    const user = await createUser.execute({ email, password });

    return response.json(instanceToPlain(user));
  }
}
