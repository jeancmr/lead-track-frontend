import type { User } from '@/lead-track/interfaces/user.interface';

export interface LoginResponse {
  message: string;
  data: User;
  token: string;
}
