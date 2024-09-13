export const navigationLinksWithoutHome: { href: string; title: string }[] = [
  { href: "/contact", title: "Let’s meet" },
  // { href: "/projects", title: "Projects" },
];

export const navigationLinks: { href: string; title: string }[] = [
  { href: "/", title: "Home" },
  ...navigationLinksWithoutHome,
];
