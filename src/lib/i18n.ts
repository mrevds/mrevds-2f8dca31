export const translations = {
  en: {
    navigation: {
      items: {
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
      },
      mobileTitle: "Navigation",
      introTitle: "Denis",
      introSubtitle: "Backend developer",
      languageToggleShort: "EN",
      languageToggleHint: "Language",
    },
    hero: {
      badge: "Backend engineer",
      stack: "Go · PHP · Laravel",
      name: "Denis",
      role: "Backend Engineer",
      summary:
        "I build reliable backend services in Go and Laravel, focusing on clean architecture, resilience, and fast delivery.",
      secondary:
        "I collaborate closely with product teams, automate delivery pipelines, and keep performance budgets under control.",
      availability: "Open for remote backend roles",
      location: "Tashkent · UTC+5",
      ctaPrimary: "Message on Telegram",
      ctaSecondary: "GitHub profile",
      stats: [
        { label: "Commercial projects", value: "6+" },
        { label: "Experience", value: "2+ yrs" },
        { label: "Core stack", value: "Go / PHP" },
        { label: "Timezone", value: "UTC+5" },
      ],
    },
    about: {
      title: "About me",
      paragraphs: [
        "Backend developer focused on high-performance APIs, distributed systems, and developer experience.",
        "I value clear communication, strong documentation, and incremental delivery that keeps the team aligned.",
      ],
      stats: [
        { label: "Projects", value: "6" },
        { label: "Experience", value: "2 yrs" },
        { label: "Goal", value: "Production-ready backends" },
      ],
      focusTitle: "Focus",
      focusItems: [
        "API design",
        "Microservices",
        "Team communication",
        "Async messaging",
        "Clean architecture",
      ],
    },
    skills: {
      title: "Technical skills",
      description: "Technologies and tools I rely on to ship resilient services.",
      categories: {
        backend: "Backend development",
        data: "Data & messaging",
        devops: "DevOps & tools",
        system: "System & scripting",
        quality: "Quality & testing",
      },
    },
    projects: {
      title: "Projects",
      description: "Selected backend builds that highlight scalability, security, and clean delivery.",
      cards: {
        pizza: {
          title: "Pizza App",
          description:
            "Microservice food delivery platform with gRPC services, Kafka streaming, and JWT-secured gateways.",
        },
        laravelShop: {
          title: "Laravel E-Commerce",
          description:
            "Full-featured storefront with catalog, cart, checkout, and role-based admin tooling.",
        },
        laravelDrive: {
          title: "Laravel Cloud Drive",
          description:
            "Dropbox-style storage with file sharing, access policies, and S3-compatible storage backend.",
        },
        auth: {
          title: "Auth Microservice",
          description:
            "gRPC authentication service with JWT issuance, user management, and PostgreSQL persistence.",
        },
        rest: {
          title: "REST API services",
          description:
            "Gin-based REST API with JWT auth, content moderation, and Redis-backed caching.",
        },
        cli: {
          title: "CLI AI Chat",
          description:
            "Terminal client for AIML API with session history, multiple models, and offline storage.",
        },
      },
      githubLabel: "GitHub",
      liveLabel: "Live demo",
    },
    contact: {
      title: "Contacts",
      description: "Ready to discuss new projects and interesting challenges.",
      ctaLabel: "Ping me on Telegram",
      ctaSubtitle: "@mrevds",
      ctaButton: "Open Telegram",
      methods: [
        {
          id: "telegram",
          label: "Telegram",
          value: "@mrevds",
          href: "https://t.me/mrevds",
          color: "from-blue-400 to-blue-600",
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          value: "linkedin.com/in/mrevds",
          href: "https://www.linkedin.com/in/mrevds",
          color: "from-sky-500 to-blue-700",
        },
        {
          id: "twitter",
          label: "X (Twitter)",
          value: "@mrevds17",
          href: "https://x.com/mrevds17",
          color: "from-gray-800 to-black",
        },
        {
          id: "leetcode",
          label: "LeetCode",
          value: "leetcode.com/mrevds",
          href: "https://leetcode.com/mrevds",
          color: "from-yellow-400 to-yellow-600",
        },
      ],
      footer: "Denis. Backend Developer",
    },
  },
  ru: {
    navigation: {
      items: {
        home: "Главная",
        about: "Обо мне",
        skills: "Навыки",
        projects: "Проекты",
        contact: "Контакты",
      },
      mobileTitle: "Навигация",
      introTitle: "Денис",
      introSubtitle: "Бэкенд-разработчик",
      languageToggleShort: "RU",
      languageToggleHint: "Язык",
    },
    hero: {
      badge: "Бэкенд-инженер",
      stack: "Go · PHP · Laravel",
      name: "Денис",
      role: "Бэкенд-инженер",
      summary:
        "Разрабатываю надежные серверные решения на Go и Laravel с упором на архитектуру и стабильность.",
      secondary:
        "Работаю с продуктовыми командами, автоматизирую CI/CD и контролирую производительность сервисов.",
      availability: "Открыт к удалённым предложениям",
      location: "Ташкент · UTC+5",
      ctaPrimary: "Написать в Telegram",
      ctaSecondary: "GitHub профиль",
      stats: [
        { label: "Коммерческие проекты", value: "6+" },
        { label: "Опыт", value: "2+ года" },
        { label: "Основной стек", value: "Go / PHP" },
        { label: "Часовой пояс", value: "UTC+5" },
      ],
    },
    about: {
      title: "Обо мне",
      paragraphs: [
        "Бэкенд-разработчик, специализирующийся на высоконагруженных API и распределённых системах.",
        "Ценю прозрачную коммуникацию, документацию и поставку продукта небольшими итерациями.",
      ],
      stats: [
        { label: "Проекты", value: "6" },
        { label: "Опыт", value: "2 года" },
        { label: "Цель", value: "Продакшн-готовые сервисы" },
      ],
      focusTitle: "Фокус",
      focusItems: [
        "Проектирование API",
        "Микросервисы",
        "Коммуникация",
        "Асинхронные очереди",
        "Чистая архитектура",
      ],
    },
    skills: {
      title: "Технические навыки",
      description: "Стек и инструменты, на которых строю устойчивые сервисы.",
      categories: {
        backend: "Бэкенд-разработка",
        data: "Данные и брокеры",
        devops: "DevOps и инструменты",
        system: "Системы и скрипты",
        quality: "Тестирование и качество",
      },
    },
    projects: {
      title: "Проекты",
      description: "Ключевые серверные решения с упором на масштабирование, безопасность и чистую поставку.",
      cards: {
        pizza: {
          title: "Pizza App",
          description:
            "Платформа доставки с микросервисами gRPC, потоками Kafka и шлюзом с JWT.",
        },
        laravelShop: {
          title: "Laravel E-Commerce",
          description:
            "Интернет-магазин с каталогом, корзиной, оплатой и админкой с ролями.",
        },
        laravelDrive: {
          title: "Laravel Cloud Drive",
          description:
            "Аналог Dropbox с расшариванием файлов и хранилищем на базе S3.",
        },
        auth: {
          title: "Auth Microservice",
          description:
            "Сервис аутентификации на gRPC с JWT, управлением пользователями и PostgreSQL.",
        },
        rest: {
          title: "REST API сервисы",
          description:
            "REST API на Gin с JWT-авторизацией, модерацией контента и кешем в Redis.",
        },
        cli: {
          title: "CLI AI Chat",
          description:
            "Консольный клиент AIML API с историей диалогов и поддержкой нескольких моделей.",
        },
      },
      githubLabel: "GitHub",
      liveLabel: "Демо",
    },
    contact: {
      title: "Контакты",
      description: "Готов обсудить проекты и интересные задачи.",
      ctaLabel: "Написать в Telegram",
      ctaSubtitle: "@mrevds",
      ctaButton: "Открыть Telegram",
      methods: [
        {
          id: "telegram",
          label: "Telegram",
          value: "@mrevds",
          href: "https://t.me/mrevds",
          color: "from-blue-400 to-blue-600",
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          value: "linkedin.com/in/mrevds",
          href: "https://www.linkedin.com/in/mrevds",
          color: "from-sky-500 to-blue-700",
        },
        {
          id: "twitter",
          label: "X (Twitter)",
          value: "@mrevds17",
          href: "https://x.com/mrevds17",
          color: "from-gray-800 to-black",
        },
        {
          id: "leetcode",
          label: "LeetCode",
          value: "leetcode.com/mrevds",
          href: "https://leetcode.com/mrevds",
          color: "from-yellow-400 to-yellow-600",
        },
      ],
      footer: "Денис. Бэкенд-разработчик",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationContent = (typeof translations)[Language];
export type NavItemId = keyof typeof translations.en.navigation.items;
export type SkillCategoryId = keyof typeof translations.en.skills.categories;
export type ProjectId = keyof typeof translations.en.projects.cards;
export type ContactMethodId = (typeof translations.en.contact.methods)[number]["id"];

export const defaultLanguage: Language = "en";