import React, { createContext, useState, useEffect } from "react";

interface ThemeContextInterface {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextInterface>(
  {} as ThemeContextInterface
);

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isTheme = localStorage.getItem("@theme");
    if (isTheme) {
      setChecked(isTheme === "light" ? false : true);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        checked,
        setChecked,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
