import * as JWT from 'jsonwebtoken';
import * as fs from 'fs';

const secretKey = fs.readFileSync('./jwt.evaluation.key', 'utf8');

export default async (token: string): Promise<string> => {
  const { email } = await JWT.verify(token, secretKey) as unknown as JWT.JwtPayload;
  return email;
};
