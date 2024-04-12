export const virtualNumbersSchema = {
  title: 'virtual numbers schema',
  description: 'describes a simple virtual number',
  version: 0,
  primaryKey: 'number',
  type: 'object',
  properties: {
    number: {
      type: 'string',
      maxLength: 100,
    },
    username: {
      type: 'string',
    },
  },
  required: ['username', 'number'],
};
