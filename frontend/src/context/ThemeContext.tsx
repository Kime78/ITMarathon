import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

interface ThemeContextType {
  font: string;
  backgroundColor: string;
  fontSize: number;
  updateTheme: (newTheme: Partial<ThemeContextType>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [font, setFont] = useState("Arial");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(16);

  const updateTheme = (newTheme: Partial<ThemeContextType>) => {
    setFont(newTheme.font !== undefined ? newTheme.font : font);
    setBackgroundColor(
      newTheme.backgroundColor !== undefined
        ? newTheme.backgroundColor
        : backgroundColor
    );
    setFontSize(newTheme.fontSize !== undefined ? newTheme.fontSize : fontSize);
  };

  const value: ThemeContextType = {
    font,
    backgroundColor,
    fontSize,
    updateTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
