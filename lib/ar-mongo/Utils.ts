export enum sort {
  ASC = 1,
  DESC = -1,
}

export const bson = {
  array: { bsonType: 'array' },
  object: { bsonType: 'object' },
  binData: { bsonType: 'binData' },
  bool: { bsonType: 'bool' },
  date: { bsonType: 'date' },
  javascript: { bsonType: 'javascript' },
  maxKey: { bsonType: 'maxKey' },
  minKey: { bsonType: 'minKey' },
  null: { bsonType: 'null' },
  objectId: { bsonType: 'objectId' },
  regex: { bsonType: 'regex' },
  string: { bsonType: 'string' },
  timestamp: { bsonType: 'timestamp' },
  number: { bsonType: 'number' },
};
