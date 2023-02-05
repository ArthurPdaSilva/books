import { useContext } from "react";
import { ThemeContext } from "@/contexts/Theme";

export default function useTheme() {
  return useContext(ThemeContext);
}
