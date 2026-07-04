export async function GET(context) {
  const articles = [
    {
      title: "Why I Started Writing",
      description: "An inquiry into how writing helps clarify software architecture and structures memory.",
      category: "Essay",
      readingTime: "5 min",
      pubDate: new Date("2026-07-04"),
      link: "/writing/why-i-started-writing"
    },
    {
      title: "Why I Built This Website",
      description: "A defense of personal websites, local-first styling, and building digital publications that last.",
      category: "Essay",
      readingTime: "7 min",
      pubDate: new Date("2026-07-04"),
      link: "/writing/why-i-built-this-website"
    },
    {
      title: "The Kind of Engineer I Want to Become",
      description: "Reflections on craftsman philosophy, engineering humility, and long-term design patterns.",
      category: "Essay",
      readingTime: "6 min",
      pubDate: new Date("2026-06-15"),
      link: "/writing/the-kind-of-engineer-i-want-to-become"
    },
    {
      title: "From Curiosity to Code: My Journey Into the World of Computers",
      description: "A narrative on the spark of curiosity in computer systems, starting from childhood computer luxury.",
      category: "Essay",
      readingTime: "9 min",
      pubDate: new Date("2025-08-20"),
      link: "/writing/from-curiosity-to-code"
    },
    {
      title: "Why I Write in Public",
      description: "How shipping drafts in public forces technical accuracy and builds compounding communication loops.",
      category: "Essay",
      readingTime: "4 min",
      pubDate: new Date("2025-05-10"),
      link: "/writing/why-i-write-in-public"
    },
    {
      title: "Lessons From Building DailyDine",
      description: "Key architectural takeaways, transaction locking details, and scaling limitations discovered during implementation.",
      category: "Engineering",
      readingTime: "8 min",
      pubDate: new Date("2026-07-03"),
      link: "/writing/lessons-from-building-dailydine"
    },
    {
      title: "My Cybersecurity Roadmap",
      description: "A self-study curriculum covering networking layers, memory exploitation, and defense mechanisms.",
      category: "Cybersecurity",
      readingTime: "10 min",
      pubDate: new Date("2026-06-01"),
      link: "/writing/my-cybersecurity-roadmap"
    },
    {
      title: "Analyzing JWT Authentication Mechanisms",
      description: "Investigating token signature validations, cross-site leaks, and secure cookie storage layouts.",
      category: "Cybersecurity",
      readingTime: "6 min",
      pubDate: new Date("2026-05-18"),
      link: "/writing/analyzing-jwt-authentication"
    },
    {
      title: "Learning Linux From Scratch",
      description: "System administration basics, process coordination commands, and kernel monitoring tools.",
      category: "Field Notes",
      readingTime: "7 min",
      pubDate: new Date("2026-05-02"),
      link: "/writing/learning-linux-from-scratch"
    },
    {
      title: "Linux Network Security and Port Monitoring Logs",
      description: "Short notes on iptables configurations, socket audits, and local buffer monitoring commands.",
      category: "Field Notes",
      readingTime: "5 min",
      pubDate: new Date("2026-04-12"),
      link: "/writing/linux-network-security"
    }
  ];

  const itemsXml = articles.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description} (${item.readingTime} read)]]></description>
      <category><![CDATA[${item.category}]]></category>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
      <link>${context.url.origin}${item.link}</link>
      <guid isPermaLink="true">${context.url.origin}${item.link}</guid>
    </item>
  `).join('');

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nikhil Bajantri</title>
    <description>A place for thoughtful software, technical writing, books, experiments, and the ideas behind them.</description>
    <link>${context.url.origin}</link>
    <atom:link href="${context.url.origin}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(feedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
