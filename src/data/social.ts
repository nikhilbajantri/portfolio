import { site } from "./site";

export const socialLinks = [
  { platform: "GitHub", url: site.github, icon: "fa-brands fa-github" },
  { platform: "LinkedIn", url: site.linkedin, icon: "fa-brands fa-linkedin" },
  { platform: "Twitter", url: site.twitter, icon: "fa-brands fa-twitter" },
  { platform: "Email", url: `mailto:${site.email}`, icon: "fa-solid fa-envelope" }
];

export default socialLinks;
