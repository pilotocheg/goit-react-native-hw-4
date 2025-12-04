import { createContext } from 'react';

export type TokenValue = string | null;

type AuthData = {
  token: TokenValue;
  setToken: (token: TokenValue) => void;
};

export const AuthContext = createContext<AuthData>({
  token: null,
  setToken: () => {},
});
