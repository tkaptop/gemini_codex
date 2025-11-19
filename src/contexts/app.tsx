"use client";

import { createContext, useContext } from "react";

// Mock App Context - 简化版本，用于避免构建错误
interface AppContextType {
  user: null;
  loading: boolean;
}

const AppContext = createContext<AppContextType>({
  user: null,
  loading: false,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext.Provider value={{ user: null, loading: false }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

export const useAppContext = useApp;
