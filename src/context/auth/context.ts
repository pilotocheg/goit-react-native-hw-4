import { createContext } from 'react';

type AuthData = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const AuthContext = createContext<AuthData>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});
