// filepath: /D:/KM/Projects/WanderNest - Travel booking/wandernest-api/src/types/express.d.ts

import { File } from 'multer';

declare global {
  namespace Express {
    interface Request {
      files?: File[];
      user?: any;
    }
  }
}