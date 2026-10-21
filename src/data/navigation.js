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
    path: '/equipo-roles',
    num: '02',
    title: 'Equipo, Roles y Cronograma',
    short: 'Cronograma',
    icon: Users,
    description: 'Semillero SENA, roles del despacho y cronograma de reuniones'
  },
  {
    path: '/seguridad',
    num: '03',
    title: 'Seguridad y Privacidad',
    short: 'Seguridad',
    icon: Lock,
    description: 'Aislamiento 100% sintético y política Zero-Cloud local'
  },
  {
    path: '/arquitectura',
    num: '04',
    title: 'Arquitectura y Stack',
    short: 'Stack & IA',
    icon: Cpu,
    description: 'Tecnologías, RAG legal, audio y comparador de modelos'
  },
  {
    path: '/alcance-mvp',
    num: '05',
    title: 'Simulador MVP (Demo)',
    short: 'Demo MVP',
    icon: CheckSquare,
    description: 'Generación interactiva con inputs editables y borrador en vivo'
  }
];
