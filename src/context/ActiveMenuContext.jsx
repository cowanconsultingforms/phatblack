import React, { createContext, useState } from 'react';

export const ActiveMenuContext = createContext();

export const ActiveMenuProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const resetActiveState = () => {
    setActiveIndex(null);
  };

  return (
    <ActiveMenuContext.Provider value={{ activeIndex, setActiveIndex, resetActiveState }}>
      {children}
    </ActiveMenuContext.Provider>
  );
};

