import { ThemeProvider } from "next-themes";
import { Toolbar } from "../toolbar";
import { Toaster } from "../ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {children}
      <Toaster position="top-center" />
      <Toolbar />
    </ThemeProvider>
  );
}
