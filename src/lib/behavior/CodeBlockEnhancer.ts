export class CodeBlockEnhancer {
  public static init(): void {
    if (typeof document === "undefined") return;

    const blocks = document.querySelectorAll("pre");
    blocks.forEach((pre) => {
      if (pre.querySelector(".code-toolbar")) return;

      const code = pre.querySelector("code");
      const text = code ? code.innerText : pre.innerText;

      // Container wrapper
      pre.style.position = "relative";
      pre.classList.add("group/code");

      // Custom copy toolbar
      const toolbar = document.createElement("div");
      toolbar.className = "absolute right-3 top-3 opacity-0 group-hover/code:opacity-100 transition-opacity flex items-center gap-2 z-10 code-toolbar";

      // Language Badge
      const lang = pre.getAttribute("data-language") || "code";
      const badge = document.createElement("span");
      badge.className = "px-1.5 py-0.5 text-[9px] font-mono text-[#71717A] bg-[#18181B] border border-white/5 uppercase rounded";
      badge.textContent = lang;
      toolbar.appendChild(badge);

      // Copy Button
      const btn = document.createElement("button");
      btn.className = "px-2 py-1 text-[10px] font-sans font-medium text-[#A1A1AA] hover:text-white bg-[#18181B] border border-white/5 rounded transition-all cursor-pointer";
      btn.textContent = "Copy";
      
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = "Copied ✓";
          btn.classList.add("text-[#10B981]");
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.classList.remove("text-[#10B981]");
          }, 1500);
        });
      });

      toolbar.appendChild(btn);
      pre.appendChild(toolbar);
    });
  }
}
export default CodeBlockEnhancer;
