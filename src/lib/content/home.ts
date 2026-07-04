import { getCollection } from "astro:content";
import { getFeaturedProjects, type Project } from "./projects";
import { getLatestArticles, type Article } from "./articles";
import { getLatestNotes, type Note } from "./notes";
import { getJourney, type JourneyEntry } from "./journey";

export interface HomepageData {
  hero?: any;
  focus?: any;
  featuredProjects: Project[];
  latestArticles: Article[];
  latestNotes: Note[];
  latestJourney?: JourneyEntry;
}

export async function getHomepage(): Promise<HomepageData> {
  const homepageCollection = await getCollection("homepage");
  const hero = homepageCollection.find(item => item.id === "hero" || item.id === "hero.md");
  const focus = homepageCollection.find(item => item.id === "focus" || item.id === "focus.md");
  
  const featuredProjects = await getFeaturedProjects(4);
  const latestArticles = await getLatestArticles(3);
  const latestNotes = await getLatestNotes(5);
  
  const journey = await getJourney();
  const latestJourney = journey[0]; // Newest milestone

  return {
    hero,
    focus,
    featuredProjects,
    latestArticles,
    latestNotes,
    latestJourney
  };
}
