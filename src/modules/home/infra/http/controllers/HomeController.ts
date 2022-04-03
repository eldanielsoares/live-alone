import HomeService from '@modules/home/services/HomeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class HomeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const homeService = container.resolve(HomeService);

    const home = await homeService.execute(id);

    return response.json(home);
  }
}
