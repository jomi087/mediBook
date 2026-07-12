import { doctors } from '../assets/assets';
import { AppContext } from './AppContext';

export const AppContextProvider = ({ children }) => {
  const currencySymbol = '₹';
  const value = {
    doctors,
    currencySymbol,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
