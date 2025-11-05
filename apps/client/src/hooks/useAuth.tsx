import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { signOut, onAuthStateChange } from '../utils/firebase';
import { getUserProfile, syncUser } from '../api/user';
import { ServerUser } from '../api/user';
import { toast } from 'sonner';

interface AuthContextType {
  user: ServerUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ServerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const fetchUserProfile = async (firebaseUser: FirebaseUser) => {
    try {
      const response = await getUserProfile();
      setUser(response.user);
      setIsAuthenticated(true);
    } catch {
      try {
        await syncUser({
          firebaseUid: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email!,
          isAdmin: false,
        });
        const response = await getUserProfile();
        setUser(response.user);
        setIsAuthenticated(true);
      } catch (syncError) {
        toast.error('Failed to sync user');
        await signOut();
        setUser(null);
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          await fetchUserProfile(firebaseUser);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
