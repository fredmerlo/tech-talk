import { createInMemoryDatabase } from '../db/createInMemoryDatabase';

// src/api/index.ts
export let db: any = null;

export const initializeDatabase = async () => {
  if (db) {
    return db;
  }

  try {
    db = await createInMemoryDatabase();

    await db.users.insert({ username: 'user1', password: 'password1' });
    await db.users.insert({ username: 'user2', password: 'password2' });

    // await db.mobileNumbers.insert({ username: 'user1', number: '200-300-4000', usageDate: Date.now(), usage: '300 minutes', cost: '$10' });
    // await db.mobileNumbers.insert({ username: 'user1', number: '432-765-1098', usageDate: Date.now(), usage: '400 minutes', cost: '$15' });
    // await db.mobileNumbers.insert({ username: 'user2', number: '100-500-6000', usageDate: Date.now(), usage: '500 minutes', cost: '$20' });
    // await db.mobileNumbers.insert({ username: 'user2', number: '300-400-5000', usageDate: Date.now(), usage: '700 minutes', cost: '$35' });

    const records = [
      { username: 'user1', number: '200-300-4000' },
      { username: 'user1', number: '432-765-1098' },
      { username: 'user2', number: '100-500-6000' },
      { username: 'user2', number: '300-400-5000' },
    ];
    
    for (let i = 0; i < 20; i++) {
        const record = records[i % records.length];
        const usageDate = new Date(Date.now() - Math.random() * 6 * 30 * 24 * 60 * 60 * 1000); // random date within the last 6 months
        const usage = `${Math.floor(Math.random() * (1000 - 70 + 1)) + 70} minutes`; // random usage between 70 and 1000 minutes
        const cost = `$${(Math.random() * (325 - 25) + 25).toFixed(2)}`; // random cost between $25 and $325
    
        await db.mobileNumbers.insert({ username: record.username, number: record.number, usageDate: usageDate.toISOString(), usage, cost });
    }

    await db.virtualNumbers.insert({ username: 'user1', number: '123-456-7890' });
    await db.virtualNumbers.insert({ username: 'user1', number: '234-567-8901' });
    await db.virtualNumbers.insert({ username: 'user2', number: '789-456-1230' });
    await db.virtualNumbers.insert({ username: 'user2', number: '456-567-8901' });

    await db.userNumbers.insert({ username: 'user1', number: '200-300-4000' });
    await db.userNumbers.insert({ username: 'user1', number: '432-765-1098' });
    await db.userNumbers.insert({ username: 'user2', number: '100-500-6000' });
    await db.userNumbers.insert({ username: 'user2', number: '300-400-5000' });

    await db.planUsage.insert({ username: 'user1', usageDate: new Date(Date.now()).toISOString(), totalUsage: '1200 minutes', totalCost: '$50', number: '200-300-4000'});
    await db.planUsage.insert({ username: 'user2', usageDate: new Date(Date.now()).toISOString(), totalUsage: '2000 minutes', totalCost: '$80', number: '300-400-5000'});
  } catch (error) {
    console.log(error);
  }
  return db;
};

initializeDatabase();

export const fetchUsage = async (username: string) => {
  try{
    const usage = await db.planUsage
    .find({
      selector: { username: username },
    })
    .exec().then((data: any) => {
      return data.map((item: any) => ({ totalUsage: item.totalUsage, totalCost: item.totalCost, usageDate: item.usageDate, number: item.number }))[0];
    });
    return Promise.resolve(usage);
  }catch (error) {
    console.log(error);
  }
  throw new Error('No plan usage found');
}

export const authenticateUserAPI = async (username: string, password: string) => {
  try {
    const user = await db.users
      .findOne({
        selector: { username: username },
      })
      .exec().then((data: any) => {
        return data;
      });
    if (user.password === password) {
      return Promise.resolve({ username, isLoggedIn: true });
    }
  } catch (error) {
    console.log(error);
  }
  throw new Error('Invalid username or password');
};

export const fetchMobileNumbers = async (username: string) => {
  try {
    const mobileNumbers = await db.mobileNumbers
    .find({
      selector: { username: username },
    })
    .exec().then((data: any) => {
      return data.map((item: any) => ({ number: item.number, cost: item.cost, usage: item.usage, usageDate: item.usageDate }));
    });
    return Promise.resolve(mobileNumbers);
  } catch (error) {
    console.log(error);
  }
  throw new Error('No mobile numbers found');
};

// src/api/virtualNumbersAPI.ts

export const fetchVirtualNumbers = async (username: string) => {
  try{
    const virtualNumbers = await db.virtualNumbers
    .find({
      selector: { username: username },
    })
    .exec().then((data: any) => {
      return data.map((item: any) => ({ number: item.number }));
    });
    return Promise.resolve(virtualNumbers);
  } catch (error) {
    console.log(error);
  }
  throw new Error('No virtual numbers found');
};

export const deleteVirtualNumberAPI = async (username: string, number: string) => {
  try {
    await db.virtualNumbers
    .findOne({
      selector: { username: username, number: number },
    })
    .remove();
    return Promise.resolve({ number });
  } catch (error) {
    console.log(error);
  }
  throw new Error('Virtual number not found');  
};

export const addVirtualNumberAPI = async (username: string, number: string) => {
  try {
    await db.virtualNumbers
    .insert({ username: username, number: number })
    return Promise.resolve({ number });
  } catch (error) {
    console.log(error);
  }
  throw new Error('Virtual number already exists');
};

export const fetchUserNumbers = async (username: string) => {
  try{
    const userNumbers = await db.userNumbers
    .find({
      selector: { username: username },
    })
    .exec().then((data: any) => {
      return data.map((item: any) => ({ number: item.number }));
    });
    return Promise.resolve(userNumbers);
  } catch (error) {
    console.log(error);
  }
  throw new Error('No user numbers found');
};

export const deleteUserNumberAPI = async (username: string, number: string) => {
  try {
    await db.userNumbers
    .findOne({
      selector: { username: username, number: number },
    })
    .remove();
    return Promise.resolve({ number });
  } catch (error) {
    console.log(error);
  }
  throw new Error('User number not found');  
};

export const addUserNumberAPI = async (username: string, number: string) => {
  try {
    await db.userNumbers
    .insert({ username: username, number: number })
    return Promise.resolve({ number });
  } catch (error) {
    console.log(error);
  }
  throw new Error('Number already exists');
};

