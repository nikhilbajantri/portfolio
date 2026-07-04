// Safe environment variable validator preventing direct process.env usages across codebase.

const runtimeEnv = typeof process !== "undefined" ? process.env : import.meta.env;

export const env = {
  SITE_URL: runtimeEnv.SITE_URL || "https://nikhilbajantri.dev",
  RESEND_API: runtimeEnv.RESEND_API || "",
  PUBLIC_GISCUS_REPO: runtimeEnv.PUBLIC_GISCUS_REPO || "nikhilbajantri/portfolio",
  PUBLIC_GISCUS_REPO_ID: runtimeEnv.PUBLIC_GISCUS_REPO_ID || "R_kgDOMN0SgQ",
  PUBLIC_GISCUS_CATEGORY: runtimeEnv.PUBLIC_GISCUS_CATEGORY || "General",
  PUBLIC_GISCUS_CATEGORY_ID: runtimeEnv.PUBLIC_GISCUS_CATEGORY_ID || "DIC_kwDOMN0Sgc4Cgc2G",
  PUBLIC_UMAMI_ID: runtimeEnv.PUBLIC_UMAMI_ID || "",
};

export default env;
