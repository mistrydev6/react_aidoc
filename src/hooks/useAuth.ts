// // useAuth.ts
// import { useState, useEffect } from "react";
// import pb from "../pocketbase";

// interface AuthState {
//   isLoggedIn: boolean;
//   user: any | null;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const useAuth = (): AuthState => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<any | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadAuthData = async () => {
//       setIsLoading(true);
//       try {
//         if (pb.authStore.isValid) {
//           await pb.collection("users").authRefresh();
//           setIsLoggedIn(true);
//           setUser(pb.authStore.model); // Access the user object
//         } else {
//           setIsLoggedIn(false);
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Error loading auth data:", error);
//         setIsLoggedIn(false);
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadAuthData();
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       await pb.collection("users").authWithPassword(email, password);
//       setIsLoggedIn(true);
//       setUser(pb.authStore.model); // Access user data

//     } catch (error) {
//       console.error("Login failed:", error);
//       setIsLoggedIn(false);
//       setUser(null);
//       throw error; // Re-throw the error for the component to handle
//     }
//   };

//   const logout = () => {
//     pb.authStore.clear();
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   return {
//     isLoggedIn,
//     user,
//     isLoading,
//     login,
//     logout,
//   };
// };

// export default useAuth;

// useAuth.ts
import { useState, useEffect } from "react";
import pb from "../pocketbase";

interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuth = (): AuthState => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      setIsLoading(true);
      try {
        if (pb.authStore.isValid) {
          await pb.collection("users").authRefresh();
          setIsLoggedIn(true);
          setUser(pb.authStore.record); // PocketBase now stores user info in record
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authData = await pb.collection("users").authWithPassword(
        email,
        password
      );
      // Update local state from the direct auth response.
      setIsLoggedIn(true);
      setUser(authData.record);
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggedIn(false);
      setUser(null);
      throw error; // Let the caller handle this.
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, isLoading, login, logout };
};

export default useAuth;
