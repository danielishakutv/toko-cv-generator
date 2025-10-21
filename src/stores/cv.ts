import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId } from '@/lib/format';

export type SectionType = 
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'links'
  | 'achievements'
  | 'certifications'
  | 'languages'
  | 'interests';

export type LayoutType = 'one-column' | 'two-column' | 'sidebar-left' | 'sidebar-right';
export type FontType = 'system' | 'serif' | 'mono';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  sections: SectionType[];
  layout: LayoutType;
  theme: {
    primary: string;
    font: FontType;
  };
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end?: string;
  current?: boolean;
  bullets: string[];
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end?: string;
  details?: string;
}

export interface Skill {
  name: string;
  level?: SkillLevel;
}

export interface Project {
  name: string;
  link?: string;
  description: string;
  bullets?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
}

export interface Language {
  name: string;
  level?: string;
}

export interface CvData {
  id: string;
  templateId: string;
  title: string;
  lastModified: string;
  personal: {
    fullName: string;
    role: string;
    email: string;
    phone: string;
    location?: string;
    website?: string;
    socials?: { label: string; url: string }[];
  };
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
  projects?: Project[];
  certifications?: Certification[];
  achievements?: string[];
  languages?: Language[];
  interests?: string[];
}

interface CvState {
  templates: Template[];
  documents: CvData[];
  activeDoc?: CvData;
  loadDemoTemplates: () => void;
  createFromTemplate: (templateId: string) => CvData;
  updateActive: (partial: Partial<CvData>) => void;
  saveActive: () => void;
  setActiveDocById: (id: string) => void;
  deleteDocument: (id: string) => void;
  duplicateDocument: (id: string) => void;
}

const DEMO_TEMPLATES: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    thumbnail: '/templates/classic.png',
    sections: ['summary', 'experience', 'education', 'skills'],
    layout: 'one-column',
    theme: { primary: '#2563eb', font: 'system' },
  },
  {
    id: 'modern',
    name: 'Modern Two-Column',
    thumbnail: '/templates/modern.png',
    sections: ['summary', 'experience', 'education', 'skills', 'languages'],
    layout: 'two-column',
    theme: { primary: '#7c3aed', font: 'system' },
  },
  {
    id: 'elegant',
    name: 'Elegant Sidebar',
    thumbnail: '/templates/elegant.png',
    sections: ['summary', 'experience', 'education', 'skills', 'interests'],
    layout: 'sidebar-left',
    theme: { primary: '#059669', font: 'serif' },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '/templates/minimal.png',
    sections: ['experience', 'education', 'skills', 'projects'],
    layout: 'one-column',
    theme: { primary: '#0891b2', font: 'system' },
  },
  {
    id: 'creative',
    name: 'Creative',
    thumbnail: '/templates/creative.png',
    sections: ['summary', 'experience', 'projects', 'skills', 'achievements'],
    layout: 'sidebar-right',
    theme: { primary: '#dc2626', font: 'system' },
  },
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: '/templates/professional.png',
    sections: ['summary', 'experience', 'education', 'skills', 'certifications'],
    layout: 'two-column',
    theme: { primary: '#0f172a', font: 'serif' },
  },
  {
    id: 'tech',
    name: 'Tech Focus',
    thumbnail: '/templates/tech.png',
    sections: ['summary', 'experience', 'projects', 'skills', 'education'],
    layout: 'one-column',
    theme: { primary: '#4f46e5', font: 'mono' },
  },
  {
    id: 'executive',
    name: 'Executive',
    thumbnail: '/templates/executive.png',
    sections: ['summary', 'experience', 'achievements', 'education', 'certifications'],
    layout: 'sidebar-left',
    theme: { primary: '#92400e', font: 'serif' },
  },
  {
    id: 'academic',
    name: 'Academic',
    thumbnail: '/templates/academic.png',
    sections: ['summary', 'education', 'experience', 'projects', 'certifications', 'languages'],
    layout: 'one-column',
    theme: { primary: '#1e40af', font: 'serif' },
  },
];

export const useCvStore = create<CvState>()(
  persist(
    (set, get) => ({
      templates: [],
      documents: [],
      activeDoc: undefined,

      loadDemoTemplates: () => {
        set({ templates: DEMO_TEMPLATES });
      },

      createFromTemplate: (templateId: string) => {
        const template = get().templates.find(t => t.id === templateId);
        if (!template) {
          throw new Error('Template not found');
        }

        const newDoc: CvData = {
          id: generateId(),
          templateId,
          title: 'Untitled CV',
          lastModified: new Date().toISOString(),
          personal: {
            fullName: '',
            role: '',
            email: '',
            phone: '',
          },
        };

        set({ activeDoc: newDoc });
        return newDoc;
      },

      updateActive: (partial: Partial<CvData>) => {
        const { activeDoc } = get();
        if (!activeDoc) return;

        const updated = {
          ...activeDoc,
          ...partial,
          lastModified: new Date().toISOString(),
        };

        set({ activeDoc: updated });
      },

      saveActive: () => {
        const { activeDoc, documents } = get();
        if (!activeDoc) return;

        const existingIndex = documents.findIndex(d => d.id === activeDoc.id);
        
        if (existingIndex >= 0) {
          const updated = [...documents];
          updated[existingIndex] = activeDoc;
          set({ documents: updated });
        } else {
          set({ documents: [...documents, activeDoc] });
        }
      },

      setActiveDocById: (id: string) => {
        const doc = get().documents.find(d => d.id === id);
        if (doc) {
          set({ activeDoc: { ...doc } });
        }
      },

      deleteDocument: (id: string) => {
        set(state => ({
          documents: state.documents.filter(d => d.id !== id),
        }));
      },

      duplicateDocument: (id: string) => {
        const doc = get().documents.find(d => d.id === id);
        if (!doc) return;

        const duplicated: CvData = {
          ...doc,
          id: generateId(),
          title: `${doc.title} (Copy)`,
          lastModified: new Date().toISOString(),
        };

        set(state => ({
          documents: [...state.documents, duplicated],
        }));
      },
    }),
    {
      name: 'cv-storage',
    }
  )
);
