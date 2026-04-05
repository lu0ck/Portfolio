/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  Github, 
  ExternalLink, 
  Lock, 
  FolderOpen, 
  Send, 
  Linkedin, 
  ChevronDown,
  Code2,
  Terminal,
  GraduationCap,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MatrixRain from './components/MatrixRain';

// --- Types ---
type Language = 'en' | 'pt' | 'es';

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language?: string | null;
  fork: boolean;
  updated_at: string;
  isPrivate?: boolean;
  isSiteLink?: boolean;
  hasDetails?: boolean;
  imageUrl?: string;
  descriptionKey?: string;
  languageKey?: string;
}

interface UserData {
  name: string;
  avatar_url: string;
  bio: string;
}

/// --- Translations ---
const translations = {
  en: {
    navLogo: "Lucas Software Engineer",
    navAbout: "About", navProj: "Projects", navContact: "Contact",
    heroSubtitle: "Full Stack Developer",
    heroGreeting: "HELLO, I AM",
    heroDesc: "// ARCHITECTING DIGITAL SOLUTIONS.",
    heroEdu: "Software Engineering student (2030) and Systems Analysis & Development student (2027). Passionate about building robust Full Stack applications and exploring new technologies.",
    bio: "I am a dedicated Software Developer currently pursuing two degrees: Software Engineering and Systems Analysis & Development. My journey in technology is driven by a passion for solving complex problems and creating efficient, scalable digital solutions. With experience in both frontend and backend development, I strive to build applications that provide exceptional user experiences.",
    btnProjects: "My Projects", btnGithub: "GitHub",
    projSectionTitle: "Original Projects",
    skillsTitle: "Tech Stack",
    statusAvailable: "Available for new projects",
    statusInProgress: "In Progress",
    statusFuture: "Future",
    statusCompleted: "Completed",
    descOficina: "Complete management and control system focused on motorcycle repair shops.",
    descAnota: "Application dedicated to creating notes and daily personal organization.",
    descOrganizaAI: "AI-powered task and project management application",
    descOpaEuQuero: "E-commerce platform for local products",
    repoOwn: "Own Profile Repository",
    loading: "Loading repositories...",
    contactTitle: "Let's Talk?", 
    contactDesc: "I am currently open to new opportunities and connections. If you have a job opening, a project, or just want to chat, feel free to reach out!",
    btnMessage: "Send Message",
    eduTitle: "Education",
    eduSoftwareEng: "Software Engineering (B.S.)",
    eduADS: "Analysis and Systems Development",
    eduFinish: "Finishing in",
    footerText: "Designed and developed. © 2026 lucas.",
    anotaDetailsTitle: "Anotaaqui - Personal Financial Management",
    anotaDetailsSubtitle: "React TypeScript Vite Tailwind Supabase License Status hCaptcha",
    anotaDetailsIntro: "Complete personal financial management application with control of income, expenses, investments, goals and much more.",
    anotaDetailsAboutTitle: "📱 About the Project",
    anotaDetailsAboutDesc: "Anotaaqui is a personal financial management application developed to help you control your finances simply and efficiently. Manage bank accounts, credit cards, investments, reserve goals and track all your financial transactions in one place.",
    anotaDetailsFeaturesTitle: "✨ Main Features",
    anotaDetailsFeatures: [
      "Accounts: Registration of bank accounts, digital wallets and physical cash",
      "Credit Cards: Limit control, closing and due dates",
      "Transactions: Recording of income and expenses with categories and subcategories",
      "Investments: Track contributions, profitability and make withdrawals",
      "Reserves/Goals: Define financial objectives and track progress",
      "Price Tracker: Monitor product prices on wishlist and receive alerts",
      "Stock Tracker: Track stock portfolio with real-time quotes",
      "Schedules: Schedule future payments and track installments",
      "Transfers: Move values between accounts, investments and reserves",
      "General History: View all history with filters, pagination and editing",
      "Charts: Visualization of expenses by category and trends",
      "Calendar: Financial history viewed by date",
      "Quotes: Quote bar with currencies, cryptocurrencies and variations",
      "Currency Conversion: Convert values to USD, EUR, GBP and more",
      "Local Backup: Export and import your data for extra security",
      "Notifications: Alerts for spending, due dates and goals",
      "Cloud Sync: Data synchronized with Supabase (PostgreSQL)",
      "Instant Update: Optimistic updates for immediate feedback",
      "Security: hCaptcha anti-bot in authentication",
      "Customizable Theme: Choose from multiple theme colors",
      "Dark Mode: Complete dark mode theme"
    ],
    anotaDetailsTechTitle: "🛠️ Technologies",
    anotaDetailsTechFrontend: "Frontend: React 19, TypeScript, Vite, Tailwind CSS 4, Recharts, Lucide React, Motion, date-fns",
    anotaDetailsTechBackend: "Backend & Data: Supabase (PostgreSQL), Auth, Storage, Realtime, hCaptcha",
    anotaDetailsFutureTitle: "Future (Expansion)",
    anotaDetailsFuture: "Tauri (Desktop App), Capacitor (Mobile App)",
    btnVisitSite: "Visit Website",
    btnClose: "Close",
    crimsonDetailsTitle: "Crimson Sentinel - Iron Man Price Tracker",
    crimsonDetailsSubtitle: "React Vite Tailwind Node.js Express Gemini AI Discord Telegram",
    crimsonDetailsIntro: "An automated price tracker with Iron Man HUD-inspired interface.",
    crimsonDetailsAboutTitle: "📱 About the Project",
    crimsonDetailsAboutDesc: "An automated price tracking system that monitors products in Brazilian stores (Amazon, Mercado Livre, Magalu, Kabum). Uses Google Gemini AI to extract data from URLs and analyze market trends. Sends alerts via Discord, Telegram or Email when price hits target. Automatic scanning every 12 hours.",
    crimsonDetailsFeaturesTitle: "✨ Main Features",
    crimsonDetailsFeatures: [
      "Price monitoring in Brazilian stores (Amazon, Mercado Livre, Magalu, Kabum)",
      "Google Gemini AI for data extraction and market analysis",
      "Alerts via Discord, Telegram or Email",
      "Automatic scanning every 12 hours",
      "Price history charts",
      "Local JSON persistence",
      "Can be packaged as desktop app (Electron)"
    ],
    crimsonDetailsTechTitle: "🛠️ Technologies",
    crimsonDetailsTechFrontend: "Frontend: React 19, Vite, Tailwind CSS, Framer Motion, Recharts",
    crimsonDetailsTechBackend: "Backend: Node.js + Express",
    crimsonDetailsTechIA: "IA: Google Gemini API, Serper.dev, Tavily",
    crimsonDetailsTechNotifications: "Notifications: Nodemailer, Discord/Telegram Webhooks",
    crimsonDetailsPitch: "Developed an automated price tracker with Iron Man HUD-style interface. Uses Google Gemini AI to extract product data and analyze market trends, with real-time notifications via Discord/Telegram/Email. Stack: React + Node.js + Tailwind + AI.",
    descCrimson: "Automated price tracker with Iron Man HUD interface",
    oficinaDetailsTitle: "OFICINA_MOTOS - Motorcycle Workshop Management",
    oficinaDetailsSubtitle: "React TypeScript Vite Tailwind Supabase",
    oficinaDetailsIntro: "Complete management and control system focused on motorcycle repair shops.",
    oficinaDetailsAboutTitle: "📱 About the Project",
    oficinaDetailsAboutDesc: "A comprehensive management system for motorcycle repair shops. Controls customers, vehicles, services, parts inventory, financial transactions, and more. Modern interface with real-time updates.",
    oficinaDetailsFeaturesTitle: "✨ Main Features",
    oficinaDetailsFeatures: [
      "Customer registration and management",
      "Vehicle tracking by customer",
      "Service orders and OS creation",
      "Parts and inventory control",
      "Financial transactions (income/expenses)",
      "Service history per vehicle",
      "Dashboard with statistics",
      "Real-time updates with Supabase",
      "Dark mode theme",
      "Mobile-friendly design"
    ],
    oficinaDetailsTechTitle: "🛠️ Technologies",
    oficinaDetailsTechFrontend: "Frontend: React 19, TypeScript, Vite, Tailwind CSS, Motion, Lucide React",
    oficinaDetailsTechBackend: "Backend: Supabase (PostgreSQL), Auth, Realtime",
    oficinaDetailsFutureTitle: "Future (Expansion)",
    oficinaDetailsFuture: "Mobile App (Capacitor), Desktop App (Tauri), WhatsApp Integration",
    oficinaDetailsPitch: "Developed a complete management system for motorcycle repair shops with React and Supabase. Controls customers, vehicles, services, inventory and finances. Stack: React + TypeScript + Tailwind + Supabase.",
    anotaDetailsTitle: "Anotaaqui - Personal Financial Management",
    navLogo: "Lucas Engenheiro de Software",
    navAbout: "Sobre", navProj: "Projetos", navContact: "Contato",
    heroSubtitle: "Desenvolvedor Full Stack",
    heroGreeting: "OLÁ, EU SOU",
    heroDesc: "// ARQUITETANDO SOLUÇÕES DIGITAIS.",
    heroEdu: "Estudante de Engenharia de Software (2030) e Análise e Desenvolvimento de Sistemas (2027). Apaixonado por construir aplicações Full Stack robustas e explorar novas tecnologias.",
    bio: "Sou um Desenvolvedor de Software dedicado, atualmente cursando duas graduações: Engenharia de Software e Análise e Desenvolvimento de Sistemas. Minha jornada na tecnologia é movida pela paixão em resolver problemas complexos e criar soluções digitais eficientes e escaláveis. Com experiência em desenvolvimento frontend e backend, busco construir aplicações que proporcionem experiências excepcionais aos usuários.",
    btnProjects: "Meus Projetos", btnGithub: "GitHub",
    projSectionTitle: "Projetos Originais",
    skillsTitle: "Tecnologias",
    statusAvailable: "Disponível para novos projetos",
    statusInProgress: "Em construção",
    statusFuture: "Futuro",
    statusCompleted: "Concluído",
    descOficina: "Sistema completo de gerenciamento e controle focado para oficina de motos.",
    descAnota: "Aplicação dedicada à criação de anotações e organização pessoal diária.",
    descOrganizaAI: "Aplicação de gestão de tarefas e projetos com IA",
    descOpaEuQuero: "Plataforma de e-commerce para produtos locais",
    repoOwn: "Repositório Próprio",
    loading: "Carregando repositórios...",
    contactTitle: "Vamos Conversar?", 
    contactDesc: "Atualmente estou aberto a novas oportunidades e conexões. Se você tem uma vaga, projeto ou apenas quer bater um papo, sinta-se livre para entrar em contato!",
    btnMessage: "Enviar Mensagem",
    eduTitle: "Educação",
    eduSoftwareEng: "Engenharia de Software",
    eduADS: "Análise e Desenvolvimento de Sistemas",
    eduFinish: "Conclusão em",
    footerText: "Projetado e desenvolvido. © 2026 lucas.",
    anotaDetailsTitle: "Anotaaqui - Gestão Financeira Pessoal",
    anotaDetailsSubtitle: "React TypeScript Vite Tailwind Supabase License Status hCaptcha",
    anotaDetailsIntro: "Aplicativo completo de gestão financeira pessoal com controle de receitas, despesas, investimentos, metas e muito mais.",
    anotaDetailsAboutTitle: "📱 Sobre o Projeto",
    anotaDetailsAboutDesc: "Anotaaqui é um aplicativo de gestão financeira pessoal desenvolvido para ajudar você a controlar suas finanças de forma simples e eficiente. Gerencie contas bancárias, cartões de crédito, investimentos, reserve metas e acompanhe todos os seus lançamentos financeiros em um só lugar.",
    anotaDetailsFeaturesTitle: "✨ Funcionalidades Principais",
    anotaDetailsFeatures: [
      "Contas: Cadastro de contas bancárias, carteiras digitais e dinheiro físico",
      "Cartões de Crédito: Controle de limite, data de fechamento e vencimento",
      "Transações: Registro de receitas e despesas com categorias e subcategorias",
      "Investimentos: Acompanhe aportes, rentabilidade e realize resgates",
      "Reservas/Metas: Defina objetivos financeiros e acompanhe o progresso",
      "Rastreador de Preços: Monitore preços de produtos na wishlist e receba alertas",
      "Rastreador de Ações: Acompanhe portfólio de ações com cotações em tempo real",
      "Agendamentos: Agende pagamentos futuros e acompanhe parcelas",
      "Transferências: Movimente valores entre contas, investimentos e reservas",
      "Histórico Geral: Visualize todo o histórico com filtros, paginação e edição",
      "Gráficos: Visualização de despesas por categoria e tendências",
      "Calendário: Histórico financeiro visualizado por data",
      "Cotações: Barra de cotações com moedas, criptomoedas e variações",
      "Conversão de Moedas: Converta valores para USD, EUR, GBP e mais",
      "Backup Local: Exporte e importe seus dados para segurança extra",
      "Notificações: Alertas para gastos, vencimentos e metas",
      "Sincronização em Nuvem: Dados sincronizados com Supabase (PostgreSQL)",
      "Atualização Instantânea: Optimistic updates para feedback imediato",
      "Segurança: hCaptcha anti-bot na autenticação",
      "Tema Customizável: Escolha entre múltiplas cores de tema",
      "Modo Escuro: Tema dark mode completo"
    ],
    anotaDetailsTechTitle: "🛠️ Tecnologias",
    anotaDetailsTechFrontend: "Frontend: React 19, TypeScript, Vite, Tailwind CSS 4, Recharts, Lucide React, Motion, date-fns",
    anotaDetailsTechBackend: "Backend & Data: Supabase (PostgreSQL), Auth, Storage, Realtime, hCaptcha",
    anotaDetailsFutureTitle: "Futuro (Expansão)",
    anotaDetailsFuture: "Tauri (App Desktop), Capacitor (App Mobile)",
    btnVisitSite: "Visitar Website",
    btnClose: "Fechar",
    crimsonDetailsTitle: "Crimson Sentinel - Rastreador de Preços Iron Man",
    crimsonDetailsSubtitle: "React Vite Tailwind Node.js Express Gemini AI Discord Telegram",
    crimsonDetailsIntro: "Um rastreador de preços automatizado com interface inspirada no HUD do Homem de Ferro.",
    crimsonDetailsAboutTitle: "📱 Sobre o Projeto",
    crimsonDetailsAboutDesc: "Um sistema de rastreamento de preços automatizado que monitora produtos em lojas brasileiras (Amazon, Mercado Livre, Magalu, Kabum). Usa Google Gemini AI para extrair dados de URLs e analisar tendências de mercado. Envia alertas via Discord, Telegram ou Email quando o preço atinge o alvo. Escaneamento automático a cada 12 horas.",
    crimsonDetailsFeaturesTitle: "✨ Funcionalidades Principais",
    crimsonDetailsFeatures: [
      "Monitoramento de preços em lojas brasileiras (Amazon, Mercado Livre, Magalu, Kabum)",
      "Google Gemini AI para extração de dados e análise de mercado",
      "Alertas via Discord, Telegram ou Email",
      "Escaneamento automático a cada 12 horas",
      "Gráficos de histórico de preços",
      "Persistência local em JSON",
      "Pode ser empacotado como app desktop (Electron)"
    ],
    crimsonDetailsTechTitle: "🛠️ Tecnologias",
    crimsonDetailsTechFrontend: "Frontend: React 19, Vite, Tailwind CSS, Framer Motion, Recharts",
    crimsonDetailsTechBackend: "Backend: Node.js + Express",
    crimsonDetailsTechIA: "IA: Google Gemini API, Serper.dev, Tavily",
    crimsonDetailsTechNotifications: "Notificações: Nodemailer, Webhooks Discord/Telegram",
    crimsonDetailsPitch: "Desenvolvi um rastreador de preços automatizado com interface estilo Iron Man HUD. Utiliza Google Gemini AI para extrair dados de produtos e analisar tendências de mercado, com notificações em tempo real via Discord/Telegram/Email. Stack: React + Node.js + Tailwind + IA.",
    descCrimson: "Rastreador de preços automatizado com interface HUD Iron Man",
    oficinaDetailsTitle: "OFICINA_MOTOS - Sistema de Gestão para Oficina de Motos",
    oficinaDetailsSubtitle: "React TypeScript Vite Tailwind Supabase",
    oficinaDetailsIntro: "Sistema completo de gerenciamento e controle focado para oficina de motos.",
    oficinaDetailsAboutTitle: "📱 Sobre o Projeto",
    oficinaDetailsAboutDesc: "Um sistema abrangente de gestão para oficinas de motos. Controla clientes, veículos, serviços, estoque de peças, transações financeiras e muito mais. Interface moderna com atualizações em tempo real.",
    oficinaDetailsFeaturesTitle: "✨ Funcionalidades Principais",
    oficinaDetailsFeatures: [
      "Cadastro e gerenciamento de clientes",
      "Controle de veículos por cliente",
      "Ordens de serviço e criação de OS",
      "Controle de peças e estoque",
      "Transações financeiras (receitas/despesas)",
      "Histórico de serviços por veículo",
      "Dashboard com estatísticas",
      "Atualizações em tempo real com Supabase",
      "Tema dark mode",
      "Design responsivo para mobile"
    ],
    oficinaDetailsTechTitle: "🛠️ Tecnologias",
    oficinaDetailsTechFrontend: "Frontend: React 19, TypeScript, Vite, Tailwind CSS, Motion, Lucide React",
    oficinaDetailsTechBackend: "Backend: Supabase (PostgreSQL), Auth, Realtime",
    oficinaDetailsFutureTitle: "Futuro (Expansão)",
    oficinaDetailsFuture: "App Mobile (Capacitor), App Desktop (Tauri), Integração WhatsApp",
    oficinaDetailsPitch: "Desenvolvi um sistema completo de gestão para oficinas de motos com React e Supabase. Controla clientes, veículos, serviços, estoque e finanças. Stack: React + TypeScript + Tailwind + Supabase."
  },
  es: {
    navLogo: "Lucas Ingeniero de Software",
    navAbout: "Sobre mí", navProj: "Proyectos", navContact: "Contacto",
    heroSubtitle: "Desarrollador Full Stack",
    heroGreeting: "HOLA, SOY",
    heroDesc: "// ARQUITECTANDO SOLUCIONES DIGITALES.",
    heroEdu: "Estudiante de Ingeniería de Software (2030) y Análisis y Desarrollo de Sistemas (2027). Apaixonado por construir aplicações Full Stack robustas e explorar novas tecnologias.",
    bio: "Soy un Desarrollador de Software dedicado, actualmente cursando dos carreras: Ingeniería de Software y Análisis y Desarrollo de Sistemas. Mi viaje en la tecnología está impulsado por la pasión de resolver problemas complejos y crear soluciones digitales eficientes y escalables. Con experiencia en desarrollo frontend y backend, me esfuerzo por construir aplicaciones que brinden experiencias de usuario excepcionales.",
    btnProjects: "Mis Proyectos", btnGithub: "GitHub",
    projSectionTitle: "Proyectos Originales",
    skillsTitle: "Tecnologías",
    statusAvailable: "Disponible para nuevos proyectos",
    statusInProgress: "En construcción",
    statusFuture: "Futuro",
    statusCompleted: "Completado",
    descOficina: "Sistema completo de gestión y control enfocado a talleres de motos.",
    descAnota: "Aplicación dedicada a la creación de notas y organización personal diaria.",
    descOrganizaAI: "Aplicación de gestión de tareas y proyectos con IA",
    descOpaEuQuero: "Plataforma de e-commerce para productos locales",
    repoOwn: "Repositorio Propio",
    loading: "Cargando repositórios...",
    contactTitle: "¿Hablamos?", 
    contactDesc: "Actualmente estoy abierto a nuevas oportunidades e conexiones. Si tienes una vacante, un proyecto o simplemente quieres saludar, ¡no dudes en contactarme!",
    btnMessage: "Enviar Mensaje",
    eduTitle: "Educación",
    eduSoftwareEng: "Ingeniería de Software",
    eduADS: "Análisis y Desarrollo de Sistemas",
    eduFinish: "Finalización en",
    footerText: "Diseñado y desarrollado. © 2026 lucas.",
    anotaDetailsTitle: "Anotaaqui - Gestión Financiera Personal",
    anotaDetailsSubtitle: "React TypeScript Vite Tailwind Supabase License Status hCaptcha",
    anotaDetailsIntro: "Aplicación completa de gestión financiera personal com control de ingresos, gastos, inversiones, metas y mucho más.",
    anotaDetailsAboutTitle: "📱 Sobre el Proyecto",
    anotaDetailsAboutDesc: "Anotaaqui es una aplicación de gestión financiera personal desarrollada para ayudarte a controlar tus finanzas de forma sencilla y eficiente. Gestiona cuentas bancarias, tarjetas de crédito, inversiones, reserva metas y sigue todos tus movimientos financieros en un solo lugar.",
    anotaDetailsFeaturesTitle: "✨ Funcionalidades Principais",
    anotaDetailsFeatures: [
      "Cuentas: Registro de cuentas bancarias, billeteras digitales y efectivo",
      "Tarjetas de Crédito: Control de límite, fecha de cierre y vencimiento",
      "Transacciones: Registro de ingresos y gastos con categorías y subcategorías",
      "Inversiones: Seguimiento de aportes, rentabilidad y retiros",
      "Reservas/Metas: Define objetivos financieros y sigue el progreso",
      "Rastreador de Precios: Monitorea precios de productos en wishlist y recibe alertas",
      "Rastreador de Acciones: Sigue portafolio de acciones con cotizaciones en tiempo real",
      "Agendas: Programa pagos futuros y sigue cuotas",
      "Transferencias: Mueve valores entre cuentas, inversiones y reservas",
      "Historial General: Visualiza todo el historial con filtros, paginación y edición",
      "Gráficos: Visualización de gastos por categoría y tendencias",
      "Calendario: Historial financiero visualizado por fecha",
      "Cotizaciones: Barra de cotizaciones con monedas, criptomonedas y variaciones",
      "Conversión de Monedas: Convierte valores a USD, EUR, GBP e más",
      "Copia de Seguridad Local: Exporta e importa tus datos para mayor seguridad",
      "Notificaciones: Alertas de gastos, vencimientos y metas",
      "Sincronización en la Nube: Datos sincronizados con Supabase (PostgreSQL)",
      "Actualización Instantánea: Optimistic updates para feedback inmediato",
      "Seguridad: hCaptcha anti-bot en la autenticación",
      "Tema Personalizable: Elige entre múltiples colores de tema",
      "Modo Oscuro: Tema dark mode completo"
    ],
    anotaDetailsTechTitle: "🛠️ Tecnologías",
    anotaDetailsTechFrontend: "Frontend: React 19, TypeScript, Vite, Tailwind CSS 4, Recharts, Lucide React, Motion, date-fns",
    anotaDetailsTechBackend: "Backend & Data: Supabase (PostgreSQL), Auth, Storage, Realtime, hCaptcha",
    anotaDetailsFutureTitle: "Futuro (Expansión)",
    anotaDetailsFuture: "Tauri (App Desktop), Capacitor (App Mobile)",
    btnVisitSite: "Visitar Sitio Web",
    btnClose: "Cerrar",
    crimsonDetailsTitle: "Crimson Sentinel - Rastreador de Precios Iron Man",
    crimsonDetailsSubtitle: "React Vite Tailwind Node.js Express Gemini AI Discord Telegram",
    crimsonDetailsIntro: "Un rastreador de precios automatizado con interfaz inspirada en el HUD de Iron Man.",
    crimsonDetailsAboutTitle: "📱 Sobre el Proyecto",
    crimsonDetailsAboutDesc: "Un sistema de rastreo de precios automatizado que monitorea productos en tiendas brasileñas (Amazon, Mercado Livre, Magalu, Kabum). Usa Google Gemini AI para extraer datos de URLs y analizar tendencias de mercado. Envía alertas vía Discord, Telegram o Email cuando el precio alcanza el objetivo. Escaneo automático cada 12 horas.",
    crimsonDetailsFeaturesTitle: "✨ Funcionalidades Principales",
    crimsonDetailsFeatures: [
      "Monitoreo de precios en tiendas brasileñas (Amazon, Mercado Livre, Magalu, Kabum)",
      "Google Gemini AI para extracción de datos y análisis de mercado",
      "Alertas vía Discord, Telegram o Email",
      "Escaneo automático cada 12 horas",
      "Gráficos de historial de precios",
      "Persistencia local en JSON",
      "Puede ser empaquetado como app de escritorio (Electron)"
    ],
    crimsonDetailsTechTitle: "🛠️ Tecnologías",
    crimsonDetailsTechFrontend: "Frontend: React 19, Vite, Tailwind CSS, Framer Motion, Recharts",
    crimsonDetailsTechBackend: "Backend: Node.js + Express",
    crimsonDetailsTechIA: "IA: Google Gemini API, Serper.dev, Tavily",
    crimsonDetailsTechNotifications: "Notificaciones: Nodemailer, Webhooks Discord/Telegram",
    crimsonDetailsPitch: "Desarrollé un rastreador de precios automatizado con interfaz estilo Iron Man HUD. Utiliza Google Gemini AI para extraer datos de productos y analizar tendencias de mercado, con notificaciones en tiempo real vía Discord/Telegram/Email. Stack: React + Node.js + Tailwind + IA.",
    descCrimson: "Rastreador de precios automatizado con interfaz HUD Iron Man",
    oficinaDetailsTitle: "OFICINA_MOTOS - Sistema de Gestión para Taller de Motos",
    oficinaDetailsSubtitle: "React TypeScript Vite Tailwind Supabase",
    oficinaDetailsIntro: "Sistema completo de gestión y control enfocado a talleres de motos.",
    oficinaDetailsAboutTitle: "📱 Sobre el Proyecto",
    oficinaDetailsAboutDesc: "Un sistema integral de gestión para talleres de motos. Controla clientes, vehículos, servicios, inventario de repuestos, transacciones financieras y más. Interfaz moderna con actualizaciones en tiempo real.",
    oficinaDetailsFeaturesTitle: "✨ Funcionalidades Principales",
    oficinaDetailsFeatures: [
      "Registro y gestión de clientes",
      "Control de vehículos por cliente",
      "Órdenes de servicio y creación de OS",
      "Control de piezas e inventario",
      "Transacciones financieras (ingresos/gastos)",
      "Historial de servicios por vehículo",
      "Dashboard con estadísticas",
      "Actualizaciones en tiempo real con Supabase",
      "Tema dark mode",
      "Diseño responsive para móvil"
    ],
    oficinaDetailsTechTitle: "🛠️ Tecnologías",
    oficinaDetailsTechFrontend: "Frontend: React 19, TypeScript, Vite, Tailwind CSS, Motion, Lucide React",
    oficinaDetailsTechBackend: "Backend: Supabase (PostgreSQL), Auth, Realtime",
    oficinaDetailsFutureTitle: "Futuro (Expansión)",
    oficinaDetailsFuture: "App Mobile (Capacitor), App Desktop (Tauri), Integración WhatsApp",
    oficinaDetailsPitch: "Desarrollé un sistema completo de gestión para talleres de motos con React y Supabase. Controla clientes, vehículos, servicios, inventario y finanzas. Stack: React + TypeScript + Tailwind + Supabase."
  }
};

const languages = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'es', label: 'ES', flag: '🇪🇸' }
];

const techStack = [
  "React", "TypeScript", "Node.js", "Express", "Tailwind CSS", 
  "PostgreSQL", "MongoDB", "Firebase", "Docker", "Git",
  "Python", "JavaScript", "HTML", "CSS"
];

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return (saved as Language) || 'en';
  });
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [crimsonSlideIndex, setCrimsonSlideIndex] = useState(0);
  const [anotaaquiSlideIndex, setAnotaaquiSlideIndex] = useState(0);
  const [oficinaSlideIndex, setOficinaSlideIndex] = useState(0);

  useEffect(() => {
    if (selectedProject === 'CRIMSON_SENTINEL') {
      const interval = setInterval(() => {
        setCrimsonSlideIndex(prev => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject === 'anotaaqui') {
      const interval = setInterval(() => {
        setAnotaaquiSlideIndex(prev => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject === 'OFICINA_MOTOS') {
      const interval = setInterval(() => {
        setOficinaSlideIndex(prev => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedProject]);

  const t = translations[lang] as any;
  const username = 'lu0ck';
  const linkedinUrl = "https://www.linkedin.com/in/lucaspaixao-dev";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        ]);

        const user = await userRes.json();
        const allRepos = await reposRes.json();

        setUserData({
          name: user.name || 'LUCAS',
          avatar_url: user.avatar_url,
          bio: user.bio || t.heroDesc
        });

        const reposToHide = ['lokya', 'jornal', 'lu0ck', 'crimson', 'oficina', 'oficina_motos', 'portfolio', 'discord', 'anotaaqui', 'organizaai', 'opaeuquero'];
        const filteredRepos = allRepos.filter((repo: Repo) => {
          if (repo.fork) return false;
          const nameLower = repo.name.toLowerCase();
          return !reposToHide.some(hideWord => nameLower.includes(hideWord));
        });

        setRepos(filteredRepos);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [t.heroDesc]);

  const displayRepos = useMemo(() => {
    const privateRepos: Repo[] = [
      {
        name: 'OFICINA_MOTOS',
        description: null,
        descriptionKey: 'descOficina',
        languageKey: 'statusInProgress',
        isPrivate: true,
        hasDetails: true,
        imageUrl: '/oficina_motos/tela.png', 
        html_url: 'https://github.com/lu0ck/OFICINA_MOTOS',
        fork: false,
        updated_at: ''
      },
      {
        name: 'anotaaqui',
        description: null,
        descriptionKey: 'descAnota',
        languageKey: 'statusCompleted',
        isSiteLink: true,
        hasDetails: true,
        html_url: 'https://anotaaqui.online/',
        imageUrl: '/anotaaqui/tela.png', 
        fork: false,
        updated_at: ''
      },
      {
        name: 'OrganizaAI',
        description: null,
        descriptionKey: 'descOrganizaAI',
        languageKey: 'statusFuture',
        hasDetails: true,
        html_url: 'https://github.com/lu0ck/OrganizaAI',
        imageUrl: '/OrganizaAi/tela.png',
        fork: false,
        updated_at: ''
      },
      {
        name: 'opaeuquero',
        description: null,
        descriptionKey: 'descOpaEuQuero',
        languageKey: 'statusFuture',
        hasDetails: true,
        html_url: 'https://github.com/lu0ck/opaeuquero',
        imageUrl: '/opaeuquero/tela.png',
        fork: false,
        updated_at: ''
      },
      {
        name: 'CRIMSON_SENTINEL',
        description: null,
        descriptionKey: 'descCrimson',
        languageKey: 'statusCompleted',
        hasDetails: true,
        html_url: 'https://github.com/lu0ck/CRIMSON_SENTINEL',
        imageUrl: '/crimson-sentinel/tela.png',
        fork: false,
        updated_at: ''
      }
    ];

    return [...privateRepos, ...repos].slice(0, 6);
  }, [repos]);

  return (
    <div className={`${theme === 'dark' ? 'dark bg-black text-white' : 'bg-white text-zinc-900'} min-h-screen font-sans selection:bg-red-500 selection:text-white transition-colors duration-300 relative overflow-x-hidden`}>
      {/* Background Effects */}
      {theme === 'dark' ? (
        <>
          <div className="cyber-grid fixed inset-0 -z-20" />
          <MatrixRain />
          <div className="cyber-particle" style={{ left: '5%', animationDelay: '0s' }} />
          <div className="cyber-particle" style={{ left: '12%', animationDelay: '1s' }} />
          <div className="cyber-particle" style={{ left: '18%', animationDelay: '2s' }} />
          <div className="cyber-particle" style={{ left: '25%', animationDelay: '3s' }} />
          <div className="cyber-particle" style={{ left: '32%', animationDelay: '0.5s' }} />
          <div className="cyber-particle" style={{ left: '40%', animationDelay: '1.5s' }} />
          <div className="cyber-particle" style={{ left: '48%', animationDelay: '2.5s' }} />
          <div className="cyber-particle" style={{ left: '55%', animationDelay: '4s' }} />
          <div className="cyber-particle" style={{ left: '62%', animationDelay: '3.5s' }} />
          <div className="cyber-particle" style={{ left: '70%', animationDelay: '1.2s' }} />
          <div className="cyber-particle" style={{ left: '78%', animationDelay: '2.2s' }} />
          <div className="cyber-particle" style={{ left: '85%', animationDelay: '4.2s' }} />
          <div className="cyber-particle" style={{ left: '92%', animationDelay: '0.8s' }} />
        </>
      ) : (
        <>
          <div className="light-grid fixed inset-0 -z-20" />
          <div className="light-particle" style={{ left: '5%', animationDelay: '0s' }} />
          <div className="light-particle" style={{ left: '12%', animationDelay: '1s' }} />
          <div className="light-particle" style={{ left: '18%', animationDelay: '2s' }} />
          <div className="light-particle" style={{ left: '25%', animationDelay: '3s' }} />
          <div className="light-particle" style={{ left: '32%', animationDelay: '0.5s' }} />
          <div className="light-particle" style={{ left: '40%', animationDelay: '1.5s' }} />
          <div className="light-particle" style={{ left: '48%', animationDelay: '2.5s' }} />
          <div className="light-particle" style={{ left: '55%', animationDelay: '4s' }} />
          <div className="light-particle" style={{ left: '62%', animationDelay: '3.5s' }} />
          <div className="light-particle" style={{ left: '70%', animationDelay: '1.2s' }} />
          <div className="light-particle" style={{ left: '78%', animationDelay: '2.2s' }} />
          <div className="light-particle" style={{ left: '85%', animationDelay: '4.2s' }} />
          <div className="light-particle" style={{ left: '92%', animationDelay: '0.8s' }} />
        </>
      )}
      {/* Navbar */}
      <nav className={`fixed top-0 w-full px-[5%] py-5 ${theme === 'dark' ? 'bg-black/80 border-zinc-800' : 'bg-white/80 border-zinc-200'} backdrop-blur-xl border-b flex justify-between items-center z-[1000] transition-colors`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          {t.navLogo}<span className="text-red-500">.</span>
        </motion.div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <ul className="hidden md:flex gap-6 list-none">
            <li><a href="#sobre" className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} hover:text-red-500 transition-colors text-sm`}>{t.navAbout}</a></li>
            <li><a href="#projetos" className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} hover:text-red-500 transition-colors text-sm`}>{t.navProj}</a></li>
            <li><a href="#contato" className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} hover:text-red-500 transition-colors text-sm`}>{t.navContact}</a></li>
          </ul>
          
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-md border ${theme === 'dark' ? 'border-zinc-800 text-white hover:border-red-500 bg-zinc-900/50' : 'border-zinc-200 text-zinc-900 hover:border-red-500 bg-zinc-50'} transition-all flex items-center justify-center`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-indigo-600" />}
            </motion.button>

            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`bg-transparent border ${theme === 'dark' ? 'border-zinc-800 text-white' : 'border-zinc-200 text-zinc-900'} px-3 py-1.5 rounded-md text-sm flex items-center gap-2 hover:border-red-500 transition-all`}
              >
                {languages.find(l => l.code === lang)?.flag} {languages.find(l => l.code === lang)?.label} <ChevronDown size={12} />
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-[110%] right-0 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-lg'} border rounded-md overflow-hidden flex flex-col min-w-[120px] z-[1001]`}
                  >
                    {languages.map(l => (
                      <button 
                        key={l.code}
                        onClick={() => { localStorage.setItem('portfolio-lang', l.code); setLang(l.code as Language); setIsLangMenuOpen(false); }}
                        className={`bg-transparent border-none px-4 py-2.5 ${theme === 'dark' ? 'text-zinc-400 hover:bg-white/5 hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'} text-left cursor-pointer flex items-center gap-2 transition-all`}
                      >
                        {l.flag} {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1100px] mx-auto px-[5%] pt-[120px] pb-[50px]">
        {/* Hero Section */}
        <motion.section 
          id="sobre"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[70vh] flex flex-col-reverse md:flex-row items-center justify-between gap-10 mb-[120px]"
        >
          {/* Background Grid */}
          <div className={`absolute -top-[120px] -left-[50vw] -right-[50vw] -bottom-[50px] cyber-grid ${theme === 'dark' ? 'bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]'} bg-[length:50px_50px] pointer-events-none -z-10`} />
          
          <div className="flex-1 relative">
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              {t.statusAvailable}
            </motion.div>

            {/* Ruler Decoration */}
            <div className="hidden md:flex absolute -top-10 left-0 right-12 flex-col w-full">
              <div className={`flex justify-between w-1/2 text-[9px] ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} font-mono mb-1`}>
                <span>0.00</span><span>WIDTH: AUTO</span><span>100.00</span>
              </div>
              <div className={`w-1/2 h-px ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'} relative after:content-[''] after:absolute after:right-0 after:-top-1 after:w-px after:height-3 after:bg-current before:content-[''] before:absolute before:left-0 before:-top-1 before:w-px before:height-3 before:bg-current`} />
            </div>

            <div className="relative pt-8">
              <div className="absolute flex items-center -top-5 -left-4">
                <div className="w-8 h-px bg-red-500/60" />
                <div className="w-2 h-2 border border-red-500/60 rounded-full ml-0" />
                <span className="ml-2 text-[10px] text-red-500/80 font-mono uppercase tracking-widest">{t.heroSubtitle}</span>
              </div>

              <h1 className={`text-6xl md:text-8xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'} tracking-tighter leading-none mb-0 uppercase`}>
                {t.heroGreeting}<br />
                <span className={`text-transparent bg-gradient-to-r ${theme === 'dark' ? 'from-zinc-700 to-zinc-900' : 'from-zinc-300 to-zinc-500'} bg-clip-text [-webkit-text-stroke:1px_#737373]`}>
                  {userData?.name.split(' ')[0] || 'LUCAS'}
                </span>
              </h1>

              <div className="absolute -bottom-8 left-20 w-12 h-12 text-red-500 opacity-50">
                <svg viewBox="0 0 50 50" className="w-full h-full"><path d="M 0 0 L 0 50 L 50 50" fill="none" stroke="currentColor" /></svg>
              </div>
            </div>

            <div className="mt-12 ml-0 md:ml-24 pl-6 border-l border-red-500/30 relative before:content-[''] before:absolute before:-left-[3px] before:top-0 before:w-[5px] before:h-[5px] before:bg-red-500">
              <p className={`text-lg ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} font-mono mb-2`}>{t.heroDesc}</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} font-mono mb-4 italic opacity-80`}>{t.heroEdu}</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'} max-w-2xl leading-relaxed`}>
                {t.bio}
              </p>
            </div>

            <div className="flex gap-4 flex-wrap mt-10 relative z-10">
              <a href="#projetos" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-md font-medium text-sm transition-all hover:bg-transparent hover:text-red-500 border border-red-500">
                {t.btnProjects}
              </a>
              <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 bg-transparent ${theme === 'dark' ? 'text-white border-zinc-800 hover:bg-zinc-800' : 'text-zinc-900 border-zinc-200 hover:bg-zinc-50'} border rounded-md font-medium text-sm transition-all`}>
                <Github size={18} /> {t.btnGithub}
              </a>
            </div>
          </div>

          {userData?.avatar_url && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-10"
              >
                <img 
                  src={userData.avatar_url} 
                  alt="Avatar" 
                  className="w-[240px] md:w-[320px] h-[240px] md:h-[320px] rounded-full object-cover border-2 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)] hover:scale-105 transition-transform"
                />
              </motion.div>
              {/* Decorative circle behind image */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'} rounded-full -z-10 animate-[spin_20s_linear_infinite]`} />
            </motion.div>
          )}
        </motion.section>

        {/* Tech Stack Section */}
        <section className="mb-[120px]">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-semibold tracking-tight whitespace-nowrap">{t.skillsTitle}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-red-500 to-transparent" />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.span 
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-500' : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-red-500 hover:border-red-500'} border rounded-lg text-sm font-mono cursor-default transition-all duration-200 hover:scale-110`}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-[120px]">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-semibold tracking-tight whitespace-nowrap">{t.eduTitle}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-red-500 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-6 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border rounded-xl hover:border-red-500 transition-all group`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{t.eduADS}</h3>
                  <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'} text-sm mb-2`}>{t.eduFinish} 2027</p>
                  <div className="w-12 h-1 bg-red-500 rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-6 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border rounded-xl hover:border-red-500 transition-all group`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{t.eduSoftwareEng}</h3>
                  <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'} text-sm mb-2`}>{t.eduFinish} 2030</p>
                  <div className="w-12 h-1 bg-red-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projetos" className="mb-[120px]">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-semibold tracking-tight whitespace-nowrap">{t.projSectionTitle}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-red-500 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading ? (
              <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{t.loading}</p>
            ) : (
              displayRepos.map((repo, i) => (
                <motion.div 
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => repo.hasDetails && setSelectedProject(repo.name)}
                  className={`group relative ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border rounded-xl p-6 flex flex-col transition-all hover:border-red-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(239,68,68,0.08)] overflow-hidden ${repo.hasDetails ? 'cursor-pointer' : ''}`}
                >
                  {/* Image Wrapper */}
                    <div className={`w-full aspect-video rounded-lg mb-4 overflow-hidden border flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
                      <img 
                        src={
                          repo.name.toLowerCase().includes('discord') ? 'https://www.vectorlogo.zone/logos/discordapp/discordapp-tile.svg' :
                          (repo.imageUrl || `https://picsum.photos/seed/${repo.name}/800/450`)
                        } 
                        alt={repo.name}
                        referrerPolicy="no-referrer"
                        className={repo.name.toLowerCase().includes('discord') ? "w-24 h-24 object-contain" : "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (repo.name.toLowerCase().includes('discord')) {
                            target.src = 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=800';
                          }
                        }}
                      />
                    </div>

                  <div className="flex justify-between items-center mb-4">
                    <FolderOpen className="text-red-500" size={24} />
                    <div className="flex gap-3">
                      {repo.isPrivate ? (
                        <Lock className={`${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} size={20} />
                      ) : repo.hasDetails ? (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedProject(repo.name); }}
                          className={`${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'} transition-colors bg-transparent border-none cursor-pointer p-0`}
                        >
                          <ExternalLink size={20} />
                        </button>
                      ) : repo.isSiteLink ? (
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className={`${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'} transition-colors`}>
                          <ExternalLink size={20} />
                        </a>
                      ) : (
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className={`${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'} transition-colors`}>
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className={`text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {repo.name}
                  </h3>
                  
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} flex-grow mb-5`}>
                    {repo.descriptionKey ? t[repo.descriptionKey as keyof typeof t] : (repo.description || 'No description provided.')}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] px-2.5 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 uppercase font-bold tracking-wider">
                      {repo.languageKey ? t[repo.languageKey as keyof typeof t] : (repo.language || 'Markdown')}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Contact Section */}
        <motion.section 
          id="contato"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-[600px] mx-auto mb-[50px]"
        >
          <h2 className={`text-4xl font-bold mb-5 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t.contactTitle}</h2>
          <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} mb-8`}>{t.contactDesc}</p>
          
          <a href="mailto:lucaspaixaoprofissional@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-md font-medium transition-all hover:bg-red-600 hover:-translate-y-1">
            <Send size={18} /> {t.btnMessage}
          </a>
          
          <div className="flex justify-center gap-4 mt-10">
            <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className={`w-11 h-11 rounded-full ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'} border flex items-center justify-center hover:text-red-500 hover:border-red-500 transition-all hover:-translate-y-1`}>
              <Github size={20} />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className={`w-11 h-11 rounded-full ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'} border flex items-center justify-center hover:text-red-500 hover:border-red-500 transition-all hover:-translate-y-1`}>
              <Linkedin size={20} />
            </a>
          </div>
        </motion.section>
      </main>

      <footer className={`text-center py-8 border-t ${theme === 'dark' ? 'border-zinc-800 text-zinc-500' : 'border-zinc-200 text-zinc-400'} text-xs`}>
        {t.footerText}
      </footer>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject === 'anotaaqui' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border rounded-2xl shadow-2xl relative`}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all z-10"
              >
                <ChevronDown className="rotate-180" size={24} />
              </button>

              <div className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-red-500">{t.anotaDetailsTitle}</h2>
                    <p className={`text-sm font-mono ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-6`}>{t.anotaDetailsSubtitle}</p>
                    
                    <p className={`text-lg ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'} mb-8 leading-relaxed`}>
                      {t.anotaDetailsIntro}
                    </p>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                          {t.anotaDetailsAboutTitle}
                        </h3>
                        <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed`}>
                          {t.anotaDetailsAboutDesc}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          {t.anotaDetailsFeaturesTitle}
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                          {t.anotaDetailsFeatures.map((feature: string, idx: number) => (
                            <li key={idx} className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} flex items-start gap-2`}>
                              <span className="text-red-500 mt-1">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                            {t.anotaDetailsTechTitle}
                          </h3>
                          <div className="space-y-2">
                            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              <span className="font-bold text-red-500/80">Frontend:</span> {t.anotaDetailsTechFrontend.split(': ')[1]}
                            </p>
                            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              <span className="font-bold text-red-500/80">Backend:</span> {t.anotaDetailsTechBackend.split(': ')[1]}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-3">
                            {t.anotaDetailsFutureTitle}
                          </h3>
                          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {t.anotaDetailsFuture}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 flex flex-wrap gap-4">
                      <a 
                        href="https://anotaaqui.online/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-lg font-bold transition-all hover:bg-red-600 hover:-translate-y-1 shadow-lg shadow-red-500/20"
                      >
                        <ExternalLink size={20} /> {t.btnVisitSite}
                      </a>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className={`inline-flex items-center gap-2 px-8 py-3 bg-transparent border ${theme === 'dark' ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'} rounded-lg font-bold transition-all`}
                      >
                        {t.btnClose}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crimson Sentinel Modal */}
      <AnimatePresence>
        {selectedProject === 'CRIMSON_SENTINEL' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border rounded-2xl shadow-2xl relative`}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all z-10"
              >
                <ChevronDown className="rotate-180" size={24} />
              </button>

              {/* Media Gallery */}
              <div className="relative">
                {/* Alternating Images - top row with 2 slots that cycle through all 4 images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                  <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900 relative">
                    <motion.img 
                      key={`img1-${crimsonSlideIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={`/crimson-sentinel/${crimsonSlideIndex === 0 ? 'dash' : crimsonSlideIndex === 1 ? 'login' : crimsonSlideIndex === 2 ? 'list' : 'config'}.png`}
                      alt="Slide 1"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900 relative">
                    <motion.img 
                      key={`img2-${crimsonSlideIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={`/crimson-sentinel/${crimsonSlideIndex === 0 ? 'login' : crimsonSlideIndex === 1 ? 'list' : crimsonSlideIndex === 2 ? 'config' : 'dash'}.png`}
                      alt="Slide 2"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
                {/* Video only */}
                <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900 mx-2 mb-2">
                  <iframe 
                    id="crimson-video"
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/fCOCOXnuPms"
                    title="Crimson Sentinel Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="p-6 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-red-500">{t.crimsonDetailsTitle}</h2>
                <p className={`text-sm font-mono ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-6`}>{t.crimsonDetailsSubtitle}</p>
                
                <p className={`text-lg ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'} mb-8 leading-relaxed`}>
                  {t.crimsonDetailsIntro}
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      {t.crimsonDetailsAboutTitle}
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed`}>
                      {t.crimsonDetailsAboutDesc}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      {t.crimsonDetailsFeaturesTitle}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {t.crimsonDetailsFeatures.map((feature: string, idx: number) => (
                        <li key={idx} className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} flex items-start gap-2`}>
                          <span className="text-red-500 mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      {t.crimsonDetailsTechTitle}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <span className="font-bold text-red-500/80">Frontend:</span> {t.crimsonDetailsTechFrontend}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <span className="font-bold text-red-500/80">Backend:</span> {t.crimsonDetailsTechBackend}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <span className="font-bold text-red-500/80">AI:</span> {t.crimsonDetailsTechIA}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <span className="font-bold text-red-500/80">Notifications:</span> {t.crimsonDetailsTechNotifications}
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 ${theme === 'dark' ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100'} border rounded-lg`}>
                    <p className={`text-sm italic ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      <span className="font-bold text-red-500">Pitch:</span> "{t.crimsonDetailsPitch}"
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/lu0ck/CRIMSON_SENTINEL" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-lg font-bold transition-all hover:bg-red-600 hover:-translate-y-1 shadow-lg shadow-red-500/20"
                  >
                    <Github size={20} /> GitHub
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className={`inline-flex items-center gap-2 px-8 py-3 bg-transparent border ${theme === 'dark' ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'} rounded-lg font-bold transition-all`}
                  >
                    {t.btnClose}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Anotaaqui Modal */}
      <AnimatePresence>
        {selectedProject === 'anotaaqui' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border rounded-2xl shadow-2xl relative`}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all z-10"
              >
                <ChevronDown className="rotate-180" size={24} />
              </button>

              {/* Media Gallery */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                  <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900 relative">
                    <motion.img 
                      key={`anota1-${anotaaquiSlideIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={`/anotaaqui/${anotaaquiSlideIndex === 0 ? 'dash' : anotaaquiSlideIndex === 1 ? 'login' : anotaaquiSlideIndex === 2 ? 'list' : 'config'}.png`}
                      alt="Slide 1"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900 relative">
                    <motion.img 
                      key={`anota2-${anotaaquiSlideIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={`/anotaaqui/${anotaaquiSlideIndex === 0 ? 'login' : anotaaquiSlideIndex === 1 ? 'list' : anotaaquiSlideIndex === 2 ? 'config' : 'dash'}.png`}
                      alt="Slide 2"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900 mx-2 mb-2">
                  <iframe 
                    id="anota-video"
                    className="w-full h-full rounded-lg"
                    src=""
                    title="Anotaaqui Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="p-6 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-red-500">{t.anotaDetailsTitle}</h2>
                <p className={`text-sm font-mono ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-6`}>{t.anotaDetailsSubtitle}</p>
                
                <p className={`text-lg ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'} mb-8 leading-relaxed`}>
                  {t.anotaDetailsIntro}
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      {t.anotaDetailsAboutTitle}
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed`}>
                      {t.anotaDetailsAboutDesc}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      {t.anotaDetailsFeaturesTitle}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {t.anotaDetailsFeatures.map((feature: string, idx: number) => (
                        <li key={idx} className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} flex items-start gap-2`}>
                          <span className="text-red-500 mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        {t.anotaDetailsTechTitle}
                      </h3>
                      <div className="space-y-2">
                        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          <span className="font-bold text-red-500/80">Frontend:</span> {t.anotaDetailsTechFrontend.split(': ')[1]}
                        </p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          <span className="font-bold text-red-500/80">Backend:</span> {t.anotaDetailsTechBackend.split(': ')[1]}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">
                        {t.anotaDetailsFutureTitle}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {t.anotaDetailsFuture}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <a 
                    href="https://anotaaqui.online/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-lg font-bold transition-all hover:bg-red-600 hover:-translate-y-1 shadow-lg shadow-red-500/20"
                  >
                    <ExternalLink size={20} /> {t.btnVisitSite}
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className={`inline-flex items-center gap-2 px-8 py-3 bg-transparent border ${theme === 'dark' ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'} rounded-lg font-bold transition-all`}
                  >
                    {t.btnClose}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OFICINA_MOTOS Modal */}
      <AnimatePresence>
        {selectedProject === 'OFICINA_MOTOS' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border rounded-2xl shadow-2xl relative`}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all z-10"
              >
                <ChevronDown className="rotate-180" size={24} />
              </button>

              {/* Media Gallery */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                  <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900 relative">
                    <motion.img 
                      key={`oficina1-${oficinaSlideIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={`/oficina_motos/${oficinaSlideIndex === 0 ? 'dash' : oficinaSlideIndex === 1 ? 'login' : oficinaSlideIndex === 2 ? 'list' : 'config'}.png`}
                      alt="Slide 1"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900 relative">
                    <motion.img 
                      key={`oficina2-${oficinaSlideIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={`/oficina_motos/${oficinaSlideIndex === 0 ? 'login' : oficinaSlideIndex === 1 ? 'list' : oficinaSlideIndex === 2 ? 'config' : 'dash'}.png`}
                      alt="Slide 2"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900 mx-2 mb-2">
                  <iframe 
                    id="oficina-video"
                    className="w-full h-full rounded-lg"
                    src=""
                    title="OFICINA_MOTOS Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="p-6 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-red-500">{t.oficinaDetailsTitle}</h2>
                <p className={`text-sm font-mono ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-6`}>{t.oficinaDetailsSubtitle}</p>
                
                <p className={`text-lg ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'} mb-8 leading-relaxed`}>
                  {t.oficinaDetailsIntro}
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      {t.oficinaDetailsAboutTitle}
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed`}>
                      {t.oficinaDetailsAboutDesc}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      {t.oficinaDetailsFeaturesTitle}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {t.oficinaDetailsFeatures.map((feature: string, idx: number) => (
                        <li key={idx} className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} flex items-start gap-2`}>
                          <span className="text-red-500 mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        {t.oficinaDetailsTechTitle}
                      </h3>
                      <div className="space-y-2">
                        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          <span className="font-bold text-red-500/80">Frontend:</span> {t.oficinaDetailsTechFrontend}
                        </p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          <span className="font-bold text-red-500/80">Backend:</span> {t.oficinaDetailsTechBackend}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">
                        {t.oficinaDetailsFutureTitle}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {t.oficinaDetailsFuture}
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 ${theme === 'dark' ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100'} border rounded-lg`}>
                    <p className={`text-sm italic ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      <span className="font-bold text-red-500">Pitch:</span> "{t.oficinaDetailsPitch}"
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/lu0ck/OFICINA_MOTOS" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-lg font-bold transition-all hover:bg-red-600 hover:-translate-y-1 shadow-lg shadow-red-500/20"
                  >
                    <Github size={20} /> GitHub
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className={`inline-flex items-center gap-2 px-8 py-3 bg-transparent border ${theme === 'dark' ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'} rounded-lg font-bold transition-all`}
                  >
                    {t.btnClose}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OrganizaAI Modal - Future Project */}
      <AnimatePresence>
        {selectedProject === 'OrganizaAI' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border rounded-2xl shadow-2xl relative`}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all z-10"
              >
                <ChevronDown className="rotate-180" size={24} />
              </button>

              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full uppercase">
                    {t.statusFuture}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-red-500">OrganizaAI</h2>
                <p className={`text-sm font-mono ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-6`}>React TypeScript AI Automation</p>
                
                <p className={`text-lg ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'} mb-8 leading-relaxed`}>
                  {t.descOrganizaAI}
                </p>

                <div className={`p-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border rounded-xl text-center`}>
                  <p className={`text-lg ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} mb-4`}>
                    🚀 {t.statusFuture} - Projeto em desenvolvimento
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    Em breve: mais detalhes, screenshots e funcionalidades.
                  </p>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/lu0ck/OrganizaAI" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-lg font-bold transition-all hover:bg-red-600 hover:-translate-y-1 shadow-lg shadow-red-500/20"
                  >
                    <Github size={20} /> GitHub
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className={`inline-flex items-center gap-2 px-8 py-3 bg-transparent border ${theme === 'dark' ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'} rounded-lg font-bold transition-all`}
                  >
                    {t.btnClose}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* opaeuquero Modal - Future Project */}
      <AnimatePresence>
        {selectedProject === 'opaeuquero' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border rounded-2xl shadow-2xl relative`}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all z-10"
              >
                <ChevronDown className="rotate-180" size={24} />
              </button>

              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full uppercase">
                    {t.statusFuture}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-red-500">opaeuquero</h2>
                <p className={`text-sm font-mono ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-6`}>React Node.js E-commerce</p>
                
                <p className={`text-lg ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'} mb-8 leading-relaxed`}>
                  {t.descOpaEuQuero}
                </p>

                <div className={`p-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border rounded-xl text-center`}>
                  <p className={`text-lg ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} mb-4`}>
                    🚀 {t.statusFuture} - Projeto em desenvolvimento
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    Em breve: mais detalhes, screenshots e funcionalidades.
                  </p>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/lu0ck/opaeuquero" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-lg font-bold transition-all hover:bg-red-600 hover:-translate-y-1 shadow-lg shadow-red-500/20"
                  >
                    <Github size={20} /> GitHub
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className={`inline-flex items-center gap-2 px-8 py-3 bg-transparent border ${theme === 'dark' ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'} rounded-lg font-bold transition-all`}
                  >
                    {t.btnClose}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
