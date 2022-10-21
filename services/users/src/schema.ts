import { Utils } from 'ar-mongo';

export const userCollection = {
  name: 'Users',
  schema: {
    validationLevel: 'strict',
    validationAction: 'error',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        description: 'User object',
        required: ['_id', 'firstName', 'lastName', 'email', 'password'],
        additionalProperties: true,
        properties: {
          _id: Utils.bson.objectId,

          firstName: Utils.bson.string,
          lastName: Utils.bson.string,

          email: Utils.bson.string,
          password: Utils.bson.string,

          createdDateTime: Utils.bson.date,
          updatedDateTime: Utils.bson.date,
        },
      },
    },
  },
  indexes: [
    {
      email: Utils.sort.ASC,
    },
  ],
};
