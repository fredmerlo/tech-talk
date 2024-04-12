export const planUsageSchema = {
  title: 'total usage schema',
  description: 'describes the total usage and cost for a user',
  version: 0,
  primaryKey: {
    key: 'uid',
    fields: [
        'username',
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
    username: {
      type: 'string',
    },
    usageDate: {
      type: 'string',
    },
    totalUsage: {
      type: 'string',
    },
    totalCost: {
      type: 'string',
    },
    number: {
      type: 'string',
    },
  },
  required: ['uid', 'username', 'usageDate', 'totalUsage', 'totalCost', 'number'],
};
