import * as session from 'express-session';
import * as MySQLStoreCreator from 'express-mysql-session';
import * as mysql2 from 'mysql2/promise';
import credentials from './credentials.js';
import { secret, environment } from './constants.js';

const connection = mysql2.createPool(credentials);
console.log('connection', connection);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const sessionStore = new (MySQLStoreCreator.default(session))({}, connection);

const sess = {
  key: 'sessionId',
  secret,
  store: sessionStore,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000,
    secure: environment === 'production',
    sameSite: false,
  },
};

export default sess;
