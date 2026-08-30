import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored === "dark" || stored === "light" || stored === "system") {
                return stored;
            }
        } catch {
            // In case localStorage is blocked in private browsing
        }
        return defaultTheme;
    });

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        if (theme === "light" || theme === "dark") {
            root.classList.add(theme);
        }
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            if (newTheme === "dark" || newTheme === "light" || newTheme === "system") {
                try {
                    localStorage.setItem(storageKey, newTheme);
                } catch {
                    // Safe fallback
                }
                setTheme(newTheme);
            }
        },
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
