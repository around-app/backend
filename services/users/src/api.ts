import { Api, IRequest, IResponse } from 'ar-api';

class UserApi extends Api {
  constructor(port: number) {
    super(port);

    this.on('GET', '/users', UserApi.getUsers);
  }

  static async getUsers(req: IRequest, res: IResponse): Promise<void> {
    res.json({
      data: 'Success',
    });
  }
}

export default UserApi;
