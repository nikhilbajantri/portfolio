import { getCollection } from "astro:content";

export async function getReleases() {
  const allReleases = await getCollection("releases", (entry) => {
    return entry.data.status === "Published";
  });
  
  return allReleases.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}
