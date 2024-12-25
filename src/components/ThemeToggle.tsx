import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      {theme === "light" ? (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem]" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-[1.2rem] w-[1.2rem]" />
          <span>Dark Mode</span>
        </>
      )}
    </Button>
  );
}