import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('DashBoard');
  return (
    <AppContext.Provider value={{ selectedTab, setSelectedTab}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
