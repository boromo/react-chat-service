import * as fs from 'fs';
import path from 'path';
import db from 'diskdb';

const DATABASE_NAMES = {
  USERS: 'users',
  MESSAGES: 'messages'
}
const _databases = [DATABASE_NAMES.USERS, DATABASE_NAMES.MESSAGES];
const _defaultDatabaseData = {
  [DATABASE_NAMES.USERS]: [
    {
      username: 'admin',
      admin: true,
      _id: 0
    }
  ],
  [DATABASE_NAMES.MESSAGES]: []
}
let _rootDirectory = '';
let _connection;

export function setup(rootDirectory) {
  if (!rootDirectory) {
    console.warn('[db.js] root directory not specified');
  } else {
    _rootDirectory = rootDirectory;
  }
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory);
  }
  for(const database of _databases) {
    const filePath = path.join(rootDirectory, database) + '.json';
    if(!fs.existsSync(filePath)){
      fs.writeFileSync(filePath, JSON.stringify(_defaultDatabaseData[database]));
    }
  }

  _connection = db.connect(_rootDirectory, _databases);
}

export function getConnection() {
  return _connection;
}