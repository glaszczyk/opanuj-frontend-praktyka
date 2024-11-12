import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type SidebarContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}


export const SidebarContext = createContext<SidebarContextType>(
  {} as SidebarContextType // typescript hack to avoid initializing context with undefined, use this context only with a provider
);

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;