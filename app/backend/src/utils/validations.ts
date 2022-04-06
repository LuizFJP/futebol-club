import { Request, Response, NextFunction } from 'express';

const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const verifyEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) return res.status(401).json({ message: 'All fields must be filled' });
  const validate = EMAIL_REGEX.test(email);
  console.log(validate);
  if (!validate) return res.status(401).json({ message: 'Incorrect email or password' });
  next();
};

const verifyPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) return res.status(401).json({ message: 'All fields must be filled' });
  if (password.length < 6) {
    return res.status(401).json({ message: 'Your password must be great than than 6' });
  }

  next();
};

export { verifyEmail, verifyPassword };
