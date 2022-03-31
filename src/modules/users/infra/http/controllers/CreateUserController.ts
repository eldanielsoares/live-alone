import CreateUserService from '@modules/users/services/CreateuserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateuserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }
}
