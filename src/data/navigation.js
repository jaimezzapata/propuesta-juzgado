import { 
  Home, 
  FileText, 
  CheckSquare, 
  Cpu, 
  Lock, 
  Users 
} from 'lucide-react';

export const NAV_ITEMS = [
  {
    path: '/',
    num: '00',
    title: 'Resumen Ejecutivo',
    short: 'Resumen',
    icon: Home,
    description: 'Ficha técnica y visión general de la propuesta'
  },
  {
    path: '/definicion',
    num: '01',
    title: 'Definición del Producto',
    short: 'Definición',
    icon: FileText,
    description: 'Objetivos, problemática actual y transformación digital'
  },
  {
    path: '/alcance-mvp',
    num: '02',
    title: 'Simulador MVP Tutelas',
    short: 'Simulador MVP',
    icon: CheckSquare,
    description: 'Generación interactiva con inputs editables y borrador en vivo'
  },
  {
    path: '/arquitectura',
    num: '03',
    title: 'Arquitectura y Stack',
    short: 'Stack & IA',
    icon: Cpu,
    description: 'Tecnologías y comparador Gemini vs Azure OpenAI'
  },
  {
    path: '/seguridad',
    num: '04',
    title: 'Seguridad y Mocking',
    short: 'Seguridad',
    icon: Lock,
    description: 'Aislamiento 100% sintético en SENA vs Producción Juzgado'
  },
  {
    path: '/equipo-roles',
    num: '05',
    title: 'Metodología y Gobernanza',
    short: 'Gobernanza',
    icon: Users,
    description: 'Coordinación interinstitucional SENA - Juzgado 4'
  }
];
