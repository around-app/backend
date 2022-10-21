import express, {
  Express,
  IRouterMatcher,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface RouteHandlerMap {
  [method: string]: ((name: string) => any) & IRouterMatcher<Express>;
}

export type IRequest = Request;
export type IResponse = Response;
export type INextFunction = NextFunction;

export type IRequestHandler = (
  request: IRequest,
  response: IResponse,
  next?: INextFunction,
) => Promise<void>;

export class Api {
  protected app: Express;
  private readonly port: number;
  private readonly routesHandlerMap: RouteHandlerMap;

  protected constructor(port: number) {
    this.app = express();
    this.port = port;
    this.routesHandlerMap = {
      [RequestMethods.GET]: this.app.get.bind(this.app),
      [RequestMethods.POST]: this.app.post.bind(this.app),
      [RequestMethods.PUT]: this.app.put.bind(this.app),
      [RequestMethods.PATCH]: this.app.patch.bind(this.app),
      [RequestMethods.DELETE]: this.app.delete.bind(this.app),
    };
  }

  public on(method: string, route: string, handler: IRequestHandler): void {
    this.routesHandlerMap[method](route, handler as RequestHandler);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
