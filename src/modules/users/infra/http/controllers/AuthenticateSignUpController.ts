import { container } from 'tsyringe';
import { Request, Response } from 'express';
import SendUserCodeEmailAuthenticateService from '@modules/users/services/SendUserCodeEmailAuthenticateService';
import AuthenticateSignUpService from '@modules/users/services/AuthenticateRegisterUserService';

export default class AuthenticateSignUpController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendUserCodeEmailService = container.resolve(
      SendUserCodeEmailAuthenticateService,
    );
    await sendUserCodeEmailService.execute(email);

    return response.send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const { authorization } = request.headers;
    const authenticateRegisterUser = container.resolve(
      AuthenticateSignUpService,
    );

    const autheticateSignUp = await authenticateRegisterUser.execute({
      email,
      code_auth: String(authorization),
    });

    return response.json(autheticateSignUp);
  }
}
