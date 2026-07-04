export type ShortcutCallback = (e: KeyboardEvent) => void;

interface Shortcut {
  keys: string[];
  callback: ShortcutCallback;
  scope: string;
}

export class KeyboardManager {
  private static instance: KeyboardManager;
  private shortcuts: Shortcut[] = [];
  private activeScopes: Set<string> = new Set(["global"]);
  private keySequence: string[] = [];
  private sequenceTimer: any = null;

  private constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", this.handleKeyDown.bind(this));
    }
  }

  public static getInstance(): KeyboardManager {
    if (!KeyboardManager.instance) {
      KeyboardManager.instance = new KeyboardManager();
    }
    return KeyboardManager.instance;
  }

  public registerShortcut(keysString: string, callback: ShortcutCallback, scope: string = "global"): void {
    const keys = keysString.toLowerCase().split("+").map(k => k.trim());
    this.shortcuts.push({ keys, callback, scope });
  }

  public enableScope(scope: string): void {
    this.activeScopes.add(scope);
  }

  public disableScope(scope: string): void {
    this.activeScopes.delete(scope);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
      // Don't intercept shortcuts while typing in inputs, except ESC
      if (e.key !== "Escape") return;
    }

    const key = e.key.toLowerCase();
    
    // Track sequence (e.g. "g" then "h")
    if (["g", "h", "w", "n"].includes(key)) {
      this.keySequence.push(key);
      if (this.sequenceTimer) clearTimeout(this.sequenceTimer);
      this.sequenceTimer = setTimeout(() => {
        this.keySequence = [];
      }, 1000);
    }

    // Match shortcuts
    for (const shortcut of this.shortcuts) {
      if (!this.activeScopes.has(shortcut.scope)) continue;

      // Sequence check (e.g. g h)
      if (shortcut.keys.length > 1 && shortcut.keys[0] === "g" && this.keySequence.length >= 2) {
        if (this.keySequence[0] === shortcut.keys[0] && this.keySequence[1] === shortcut.keys[1]) {
          e.preventDefault();
          shortcut.callback(e);
          this.keySequence = [];
          return;
        }
      }

      // Single combination check (e.g. ctrl+k, /)
      const matchesMeta = shortcut.keys.includes("meta") || shortcut.keys.includes("ctrl");
      const isMetaPressed = e.metaKey || e.ctrlKey;

      if (matchesMeta && isMetaPressed) {
        const otherKey = shortcut.keys.find(k => k !== "meta" && k !== "ctrl");
        if (otherKey === key) {
          e.preventDefault();
          shortcut.callback(e);
          return;
        }
      }

      if (shortcut.keys.length === 1 && shortcut.keys[0] === key) {
        e.preventDefault();
        shortcut.callback(e);
        return;
      }
    }
  }
}
export default KeyboardManager;
