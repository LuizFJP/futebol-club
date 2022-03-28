import * as JWT from 'jsonwebtoken';
import * as fs from 'fs';
import { IUser } from './interfaces';

export default async (payload:IUser) => {
  const hardKey = await fs.readFileSync('./jwt.evaluation.key', 'utf8');
  const { id, username, role, email } = payload;
  const token = JWT.sign({ id, username, role, email }, hardKey, { algorithm: 'HS256' });

  return token;
};
