import { Injectable, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, Observable } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly url: string = `http://${process.env.USERS_SERVICE_HOST}:${process.env.USERS_SERVICE_PORT}/`;
  constructor(private readonly httpModule: HttpService) {}

  getUsers(): Observable<any> {
    const res = this.httpModule
      .get(this.url)
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
