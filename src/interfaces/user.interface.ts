export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  SALES: 'sales',
  SUPPORT: 'support',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
