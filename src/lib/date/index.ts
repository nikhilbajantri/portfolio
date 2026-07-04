export function formatDate(dateString: string | Date, options: Intl.DateTimeFormatOptions = {}): string {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options
  };
  return date.toLocaleDateString("en-US", defaultOptions);
}

export function formatYearMonth(dateString: string | Date): string {
  return formatDate(dateString, { year: "numeric", month: "long" });
}
