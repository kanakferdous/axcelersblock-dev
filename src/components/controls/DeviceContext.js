import { createContext, useContext, useState } from '@wordpress/element';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [activeDevice, setActiveDevice] = useState('desktop');
  return (
    <DeviceContext.Provider value={{ activeDevice, setActiveDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);
