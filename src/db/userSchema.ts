// src/db/userSchema.ts

export const userSchema = {
  title: 'user schema',
  version: 0,
  description: 'describes a user',
  primaryKey: 'username',
  type: 'object',
  properties: {
    username: {
      type: 'string',
      maxlength: 20,
    },
    password: {
      type: 'string',
    },
  },
  required: ['username', 'password'],
};
