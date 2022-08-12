import { ComponentType, createContext, FC, ReactNode, useState } from "react";

export interface ChildProps {
  children: ReactNode;
}

const AuthContext = createContext({}) as any;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;