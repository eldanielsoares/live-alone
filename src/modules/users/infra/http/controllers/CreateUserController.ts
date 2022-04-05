import CreateUserService from '@modules/users/services/CreateuserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToPlain } from 'class-transformer';

export default class CreateuserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, accepted_terms } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      accepted_terms,
      code_auth: String(request.headers.authorization),
    });

    return response.json(instanceToPlain(user));
  }
}
