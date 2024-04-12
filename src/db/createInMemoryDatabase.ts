import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { userSchema } from './userSchema';
import { addRxPlugin, createRxDatabase } from 'rxdb';
import { mobileNumbersSchema } from './mobileNumbersSchema';
import { virtualNumbersSchema } from './virtualNumbersSchema';
import { userNumbersSchema } from './userNumbersSchema';
import { planUsageSchema } from './planUsageSchema';


// Function to create the in-memory database
export const createInMemoryDatabase = async () => {
  addRxPlugin(RxDBQueryBuilderPlugin);
  const db = await createRxDatabase({
    name: 'inmemorydb', // The name is arbitrary; it's in-memory
    storage: getRxStorageMemory(), // Use the in-memory adapter
  });

  // Create the collection(s)
  await db.addCollections({
    users: {
      schema: {
        ...userSchema,
      },
    },
    mobileNumbers: {
      schema: {
        ...mobileNumbersSchema,
      },
    },
    virtualNumbers: {
      schema: {
        ...virtualNumbersSchema,
      },
    },
    userNumbers: {
      schema: {
        ...userNumbersSchema,
      },
    },
    planUsage: {
      schema: {
        ...planUsageSchema,
      },
    },
  });

  return db;
}
