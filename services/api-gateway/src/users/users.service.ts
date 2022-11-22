import {
  Injectable,
  ForbiddenException,
  NotImplementedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { User } from '@around/types';
import { map, catchError, Observable } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly url: string = `http://${process.env.USERS_SERVICE_HOST}:${process.env.USERS_SERVICE_PORT}/`;
  constructor(private readonly httpModule: HttpService) {}

  getUsers(): Observable<Array<User>> {
    throw new NotImplementedException();
  }

  createUser(user: User): Observable<Partial<User>> {
    const res = this.httpModule
      .post(this.url, user)
      .pipe(map((res) => res.data))
      .pipe(
        catchError((e) => {
          console.log(e);
          throw new ForbiddenException('Users service not available');
        }),
      );
    return res;
  }
}
