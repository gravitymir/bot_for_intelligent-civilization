const Surreal = require('surrealdb.js');
const sdb = new Surreal('http://127.0.0.1:8000/rpc');
const connect = async () => {
  let connectedSdb;
  if (connectedSdb) {
    return connectedSdb;
  }
  try {
    await sdb.signin({
      user: 'root',
      pass: 'root'
    });
    await sdb.use('test', 'test');
    connectedSdb = sdb;
    return connectedSdb;
  } catch (e) {
    console.error('ERROR', e);
  }
};

export default {
  addClock: async (clock) => {
    const DB = await connect();
    if (DB) {
      try {
        return await DB.create('clock', clock);
      } catch (e) {
        console.error('ERROR', e);
      }
    }
  },
  getClock: async () => {
    const DB = await connect();
    if (DB) {
      try {
        return await DB.select('clock');
      } catch (e) {
        console.error('ERROR', e);
      }
    }
  },
  addQuestion: async (questions) => {
    const DB = await connect();
    if (DB) {
      try {
        return await DB.create('question', questions);
      } catch (e) {
        console.error('ERROR', e);
      }
    }
  },
  getQuestion: async () => {
    const DB = await connect();
    if (DB) {
      try {
        return await DB.select('question');
      } catch (e) {
        console.error('ERROR', e);
      }
    }
  },
  addVideo: async (table, video) => {
    const DB = await connect();
    if (DB) {
      try {
        return await DB.create(table, video);
      } catch (e) {
        console.error('ERROR', e);
      }
    }
  },
  getVideo: async (table) => {
    const DB = await connect();
    if (DB) {
      try {
        return await DB.select(table);
      } catch (e) {
        console.error('ERROR', e);
      }
    }
  },
  query: async (query) => {
    const DB = await connect();
    if (DB) {
      try {
        return await DB.query(query);
      } catch (e) {
        console.error('ERROR', e);
      }
    }
  }
};
