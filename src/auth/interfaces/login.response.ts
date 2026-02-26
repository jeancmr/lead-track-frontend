import type { User } from '@/interfaces/user.interface';

export interface LoginResponse {
  message: string;
  data: User;
  token: string;
}
