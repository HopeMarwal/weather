import { createContext, useContext, useState } from "react";

const UnitContext = createContext()

export const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState('C')
  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  )
}

export const useUnit = () => useContext(UnitContext)