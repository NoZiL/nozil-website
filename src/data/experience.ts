export interface Role {
  title: string;
  period: string;
  location: string;
  highlights: string[];
  stack: string[];
}

export interface Experience {
  company: string;
  context?: string;
  roles: Role[];
}

export const experience: Experience[] = [
  {
    company: "Tennaxia",
    roles: [
      {
        title: "Lead Mobile Engineer",
        period: "Dec 2024 – Present",
        location: "Lyon",
        highlights: [
          "Bootstrapped Tennaxia's mobile team from scratch — sole engineer for the first phase, then grew it to 3.5 people",
          "Shipped Tennaxia Déchets (B2B EHS field app integrating Trackdéchets, the French gov waste-tracing platform) from zero to paid beta in under a year",
          "Designed the full mobile architecture: offline-first data layer via TanStack Query cache, Auth0 company-wide migration, custom design system (shadcn-inspired), Turborepo monorepo shared across mobile and web",
          "Expanded scope to lead webapp restyling — migrating highest-traffic screens from server-rendered Java to React SPA within the monorepo",
        ],
        stack: [
          "React Native",
          "Expo",
          "React",
          "TypeScript",
          "TanStack Query",
          "Tailwind CSS",
          "Auth0",
          "Turborepo",
        ],
      },
    ],
  },
  {
    company: "wedoproduct studio",
    context: "Product studio I co-founded — projects below",
    roles: [
      {
        title: "Lead Mobile Engineer — C+NET",
        period: "May 2022 – Apr 2026",
        location: "France, Remote",
        highlights: [
          "Sole engineer for 4 years on an Android field app for waste management agents operating in low-connectivity environments",
          "Built offline-first sync, QR code data exchange, and MDM/EMM fleet management from scratch",
          "Delivered continuous feature development over 4 years with zero critical production incidents",
        ],
        stack: ["React Native", "Expo", "TypeScript", "GraphQL"],
      },
      {
        title: "Mobile Engineer — CVDesignR",
        period: "Jan 2024 – May 2024",
        location: "France, Remote",
        highlights: [
          "Built TalentPicker (recruiter-facing mobile app) from scratch in 5 months: auth flow, webview navigation, push notifications and deep links via Brevo",
          "Set up EAS-based CI/CD pipeline with OTA updates and automated App Store / Google Play submissions",
        ],
        stack: ["React Native", "Expo", "TypeScript"],
      },
      {
        title: "Senior Mobile Engineer — Hivebrite",
        period: "Jun 2020 – Jul 2023",
        location: "France, Remote",
        highlights: [
          "Designed an App Factory — tooling that automated generation, white-labeling, and store submission of React Native apps for 50+ clients (alumni networks, nonprofits globally)",
          "Built a real-time chat module in React Native (mobile + web) with Sendbird integration",
          "Developed a Go-based push notification service deployed on Kubernetes",
          "Negotiated and structured the commercial engagement: fixed-price phase 1 → time-and-materials for scale",
        ],
        stack: [
          "React Native",
          "TypeScript",
          "Go",
          "Redis",
          "Docker",
          "Kubernetes",
          "Sendbird",
          "GitHub Actions",
        ],
      },
      {
        title: "Mobile Engineer — WELO",
        period: "Oct 2021 – Jun 2023",
        location: "France, Remote",
        highlights: [
          "Built a cross-platform (iOS, Android, Web) property management app for a new-generation syndic",
          "Push notifications, file and photo upload, owner-facing document management",
          "Mentored a junior freelance developer",
        ],
        stack: ["React Native", "Expo", "TypeScript"],
      },
    ],
  },
  {
    company: "Mobi2Go",
    roles: [
      {
        title: "Senior Frontend Engineer",
        period: "Jun 2019 – Mar 2020",
        location: "Wellington, New Zealand",
        highlights: [
          "Joined on a working holiday visa — SaaS company providing online ordering and POS to restaurant chains",
          "Led the migration from legacy frontend to React Hooks, React Router, and Next.js",
          "Rebuilt the marketing site and established frontend test coverage",
          "Worked in SCRUM: daily standups, sprint planning, retrospectives",
        ],
        stack: ["React", "Next.js", "JavaScript", "GitLab"],
      },
    ],
  },
  {
    company: "beta.gouv.fr — Avril (France VAE)",
    roles: [
      {
        title: "Full Stack Engineer",
        period: "Feb 2018 – Mar 2019",
        location: "Paris (fully remote)",
        highlights: [
          "Freelance embedded in Avril, a startup incubated at Pôle Emploi — centralizes VAE procedures for job seekers",
          "Built the MVP from scratch in Elixir/Phoenix, then iterated with analytics-driven product management",
          "Integrated Algolia for search and Mailjet for transactional emails connected to Pôle Emploi services",
        ],
        stack: ["Elixir", "Phoenix", "PostgreSQL", "Algolia"],
      },
    ],
  },
  {
    company: "Figaro Classifieds",
    roles: [
      {
        title: "Full Stack Engineer",
        period: "Feb 2016 – Aug 2018",
        location: "Paris",
        highlights: [
          "Long-term freelance engagement building recruitment solutions from scratch — questionnaire tools and application management systems",
          "Took on a DevOps role during a major infrastructure migration",
        ],
        stack: ["React", "AngularJS", "JavaScript"],
      },
    ],
  },
  {
    company: "Alteca",
    roles: [
      {
        title: "Software Engineer",
        period: "Mar 2014 – Dec 2015",
        location: "Lyon",
        highlights: [
          "First role out of engineering school — client projects in the JVM ecosystem with JavaScript frontends",
        ],
        stack: ["Java", "JavaScript", "AngularJS"],
      },
    ],
  },
];
