import { File } from 'multer';

declare global {
  namespace Express {
    interface Request {
      files?: File[];
      user?: {
        id: number;
        email: string;
      };
    }
  }
}