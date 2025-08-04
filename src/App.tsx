import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SkipSelector } from "./components/SkipSelector";
import { ThemeToggle } from "./components/ThemeToggle";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});

function App() {
  const { setTheme } = useThemeStore();

  // Initialize theme on app load_isDark
  useEffect(() => {
    // Check for system preference if no stored preference
    const storedTheme = localStorage.getItem("theme-storage");
    if (!storedTheme) {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(systemPrefersDark);
    }
  }, [setTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <main role="main" className="pt-16">
          <SkipSelector />
        </main>

        {/* Footer */}
        <footer className="border-t mt-16 py-8 bg-muted/30">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              © 2025 Skip Hire Redesign. Built with React, Vite, and Tailwind
              CSS.
            </p>
            <p className="mt-2">
              Accessibility-first design with full keyboard navigation.
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
