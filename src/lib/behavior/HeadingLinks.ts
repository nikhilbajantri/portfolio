export class HeadingLinks {
  public static init(): void {
    if (typeof document === "undefined") return;

    const headings = document.querySelectorAll("article h2, article h3");
    headings.forEach((heading) => {
      if (!heading.id) {
        // Generate fallback ID
        heading.id = heading.textContent
          ?.toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-") || "";
      }

      // Add link copying click handler
      heading.addEventListener("click", () => {
        const url = `${window.location.origin}${window.location.pathname}#${heading.id}`;
        navigator.clipboard.writeText(url).then(() => {
          const originalText = heading.innerHTML;
          heading.classList.add("text-[#10B981]");
          setTimeout(() => {
            heading.classList.remove("text-[#10B981]");
          }, 1000);
        });
      });

      // Add custom styles for hover anchor
      heading.classList.add("cursor-pointer", "group", "relative");
      
      const anchor = document.createElement("span");
      anchor.className = "absolute -left-5 opacity-0 group-hover:opacity-100 text-[#71717A] transition-opacity select-none";
      anchor.innerHTML = "#";
      heading.prepend(anchor);
    });
  }
}
export default HeadingLinks;
