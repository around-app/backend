import {
  MongoClient,
  Collection,
  Document,
  CreateCollectionOptions,
  Db,
  Filter,
  OptionalUnlessRequiredId,
  InsertOneResult,
  IndexSpecification,
} from 'mongodb';

const endpoint = `mongodb+srv://Admin:around-mongodb@cluster0.j7fv9iq.mongodb.net/?retryWrites=true&w=majority`;

let cachedClient: MongoClient | null;

export interface IDbOptions {
  dbName: string;
  collectionName: string;
}

export class MongoInstance {
  constructor(private readonly dbName?: string) {}

  public static async getClient(): Promise<MongoClient> {
    let isConnected = false;
    if (cachedClient) {
      isConnected = await MongoInstance.ping(cachedClient);
    }
    if (!isConnected) {
      cachedClient = new MongoClient(endpoint, {
        retryWrites: true,
        w: 'majority',
      });
      await cachedClient.connect();
    }
    return cachedClient;
  }

  public static async ping(client: MongoClient): Promise<boolean> {
    try {
      const data = await client.db().command({ ping: 1 });
      return data?.ok === 1;
    } catch (err) {
      return false;
    }
  }

  public static async getDatabase(dbName: string): Promise<Db> {
    const client = await MongoInstance.getClient();
    const db = await client.db(dbName);
    return db;
  }

  public static async createCollection(
    dbOptions: IDbOptions,
    collectionOptions?: CreateCollectionOptions,
  ): Promise<Collection<Document>> {
    const db = await MongoInstance.getDatabase(dbOptions.dbName);
    const collection = await db.createCollection(
      dbOptions.collectionName,
      collectionOptions,
    );
    return collection;
  }

  public static async createIndex(
    dbOptions: IDbOptions,
    indexSpec: IndexSpecification,
  ): Promise<string> {
    const db = await MongoInstance.getDatabase(dbOptions.dbName);
    const collection = await db.collection(dbOptions.collectionName);
    const result = await collection.createIndex(indexSpec);
    return result;
  }

  public static async getCollection<T extends Document>(
    dbOptions: IDbOptions,
  ): Promise<Collection<T>> {
    const db = await MongoInstance.getDatabase(dbOptions.dbName);
    const collection = await db.collection<T>(dbOptions.collectionName);
    return collection;
  }

  public static async insertOne<T extends Document>(
    dbOptions: IDbOptions,
    doc: OptionalUnlessRequiredId<T>,
  ): Promise<InsertOneResult<T>> {
    const collection = await MongoInstance.getCollection<T>(dbOptions);
    const data = await collection.insertOne(doc);
    return data;
  }

  public static async find<T extends Document>(
    dbOptions: IDbOptions,
    filter: Filter<T>,
  ): Promise<T[]> {
    const collection = await MongoInstance.getCollection<T>(dbOptions);
    const data = await collection.find<T>(filter);
    return await data.toArray();
  }

  public static async findOne<T extends Document>(
    dbOptions: IDbOptions,
    filter: Filter<T>,
  ): Promise<T | null> {
    const collection = await MongoInstance.getCollection<T>(dbOptions);
    const data = await collection.findOne<T>(filter);
    return data;
  }

  public static async close(): Promise<void> {
    if (cachedClient) {
      await cachedClient.close();
      cachedClient = null;
    }
  }
}
