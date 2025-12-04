import { useAuthContext } from './use-auth-context';

export const useUserId = () => {
  const { token } = useAuthContext();
  return token || '';
};
