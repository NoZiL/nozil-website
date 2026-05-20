export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: "Mobile",
    items: [
      "React Native",
      "Expo",
      "TypeScript",
      "TanStack Query",
      "GraphQL",
      "REST",
      "offline-first architecture",
      "App Store & Play Store",
      "EAS / OTA updates",
    ],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    label: "Backend & Infra",
    items: [
      "Node.js",
      "Elixir / Phoenix",
      "Go",
      "Docker",
      "Kubernetes",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    label: "Auth & Services",
    items: ["Auth0", "Sendbird", "Algolia", "Brevo / Mailjet"],
  },
  {
    label: "Tooling & CI/CD",
    items: ["GitHub Actions", "GitLab CI", "Turborepo", "MDM/EMM"],
  },
  {
    label: "Practices",
    items: [
      "SCRUM",
      "code review",
      "team mentoring",
      "technical recruiting",
      "system architecture",
      "monorepo strategy",
    ],
  },
];
