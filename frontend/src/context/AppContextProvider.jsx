import { doctors } from "../assets/assets"
import { AppContext } from "./AppContext"

export const AppContextProvider = ({ children }) => {
  const value = {
    doctors,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
