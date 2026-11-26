export interface AdminUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      adminUser?: AdminUser;
    }
  }
}

export {};
