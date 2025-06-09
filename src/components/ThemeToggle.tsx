import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import { useThemeStore } from "../store/themeStore";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div className="flex items-center space-x-3 p-4">
      <Sun
        className={`h-5 w-5 transition-colors ${
          isDark ? "text-muted-foreground" : "text-foreground"
        }`}
        aria-hidden="true"
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="cursor-pointer"
      />
      <Moon
        className={`h-5 w-5 transition-colors ${
          isDark ? "text-foreground" : "text-muted-foreground"
        }`}
        aria-hidden="true"
      />
      <span className="text-sm text-muted-foreground sr-only">
        {isDark ? "Dark mode enabled" : "Light mode enabled"}
      </span>
    </div>
  );
}
