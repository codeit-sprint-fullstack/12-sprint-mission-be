import { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      auth: {
        userId: number;
      };
      user?: PrismaUser;
      validatedData?: any;
    }
  }
}

export {};
