import { PropsWithChildren, useState } from 'react';

import { AuthContext } from './context';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext>
  );
};
