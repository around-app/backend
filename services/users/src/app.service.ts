import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MUUID as MongoUUID, from as toMUUID } from 'uuid-mongodb';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@around/types';

export function fromMongoUUID(id: string): string {
  return toMUUID(id).toString();
}
export function toMongoUUID(id: string): MongoUUID {
  return toMUUID(id);
}

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}

  async createUser(user: User): Promise<Partial<User>> {
    try {
      const db = await this.connection.useDb('Around');
      const response = await db.collection<User>('users').insertOne({
        ...user,
        _id: uuidv4(),
      });
      return {
        _id: fromMongoUUID(response.insertedId.toString()),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
