import { create } from 'zustand';
import { loginAction } from '../actions/login.action';
import type { User } from '@/interfaces/user.interface';
import { checkAuthAction } from '../actions/check-auth.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
  user: User | null;
  authStatus: AuthStatus;

  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<User | null>;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  authStatus: 'checking',

  login: async (email: string, password: string) => {
    try {
      const { data: user } = await loginAction(email, password);
      set({ user, authStatus: 'authenticated' });
    } catch (error) {
      console.log(error);
      set({ user: null, authStatus: 'not-authenticated' });
    }
  },

  logout() {
    set({ user: null, authStatus: 'not-authenticated' });
  },

  checkAuthStatus: async () => {
    try {
      const user = await checkAuthAction();
      set({ user, authStatus: 'authenticated' });
      return user;
    } catch (error) {
      console.log(error);
      set({ user: null, authStatus: 'not-authenticated' });
      return null;
    }
  },
}));
