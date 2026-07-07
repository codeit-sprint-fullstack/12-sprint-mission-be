type AuthUser = {
  id: number;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser | null;
      resource?: string;
    }
  }
}

export {};
