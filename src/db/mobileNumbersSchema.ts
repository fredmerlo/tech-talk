export const mobileNumbersSchema = {
  title: 'mobile numbers schema',
  description: 'describes a simple mobile number',
  version: 0,
  primaryKey: {
    key: 'uid',
    fields: [
        'number',
        'usageDate',
    ],
    separator: '|'
  },
  type: 'object',
  properties: {
    uid: {
      type: 'string',
      maxLength: 100,
    },
    number: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
    usageDate: {
      type: 'string',
    },
    usage: {
      type: 'string',
    },
    cost: {
      type: 'string',
    },
  },
  required: ['uid', 'number', 'username', 'usageDate', 'usage', 'cost'],
};
