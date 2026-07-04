export class ThemeManager {
  public static init(): void {
    if (typeof document === "undefined") return;
    
    // Always default to dark theme for developer portfolio aesthetics
    document.documentElement.classList.add("dark");
  }
}
export default ThemeManager;
