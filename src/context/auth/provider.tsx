import { PropsWithChildren, useMemo, useState } from 'react';

import { storage } from '../../utils/storage';

import { AuthContext, TokenValue } from './context';

const STORAGE_KEY = 'token';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<TokenValue>(
    () => storage.getString(STORAGE_KEY) ?? null,
  );

  const contextValue = useMemo(
    () => ({
      token,
      setToken: (newToken: TokenValue) => {
        setToken(newToken);
        if (newToken) {
          storage.set(STORAGE_KEY, newToken);
        } else {
          storage.remove(STORAGE_KEY);
        }
      },
    }),
    [token, setToken],
  );

  return <AuthContext value={contextValue}>{children}</AuthContext>;
};
