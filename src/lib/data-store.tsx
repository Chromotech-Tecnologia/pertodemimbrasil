import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Company, Classified } from './mock-data';

interface CompanyProfile {
  userId: string;
  slug: string;
  name: string;
  category: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  whatsapp: string;
  website: string;
  address: string;
  shortDescription: string;
  fullDescription: string;
  instagram: string;
  facebook: string;
  logoUrl: string;
  coverUrl: string;
  plan: 'premium' | 'pro' | 'smart';
  createdAt: string;
}

interface StoredClassified {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: string;
  category: string;
  city: string;
  coverUrl: string;
  gallery: string[];
  status: 'active' | 'paused';
  createdAt: string;
}

interface DataStoreContextType {
  companies: CompanyProfile[];
  classifieds: StoredClassified[];
  saveCompany: (profile: CompanyProfile) => void;
  getCompanyByUserId: (userId: string) => CompanyProfile | undefined;
  getCompanyBySlug: (slug: string) => CompanyProfile | undefined;
  saveClassified: (item: StoredClassified) => void;
  updateClassified: (id: string, data: Partial<StoredClassified>) => void;
  deleteClassified: (id: string) => void;
  getClassifiedsByUserId: (userId: string) => StoredClassified[];
  getAllCompaniesAsCompany: () => Company[];
  getAllClassifiedsAsClassified: () => Classified[];
}

const DataStoreContext = createContext<DataStoreContextType>({} as DataStoreContextType);

const LS_COMPANIES = 'pdm_companies';
const LS_CLASSIFIEDS = 'pdm_classifieds';

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [classifieds, setClassifieds] = useState<StoredClassified[]>([]);

  useEffect(() => {
    const c = localStorage.getItem(LS_COMPANIES);
    if (c) setCompanies(JSON.parse(c));
    const cl = localStorage.getItem(LS_CLASSIFIEDS);
    if (cl) setClassifieds(JSON.parse(cl));
  }, []);

  const persistCompanies = (list: CompanyProfile[]) => {
    setCompanies(list);
    localStorage.setItem(LS_COMPANIES, JSON.stringify(list));
  };

  const persistClassifieds = (list: StoredClassified[]) => {
    setClassifieds(list);
    localStorage.setItem(LS_CLASSIFIEDS, JSON.stringify(list));
  };

  const saveCompany = (profile: CompanyProfile) => {
    const slug = toSlug(profile.name);
    const updated = { ...profile, slug };
    const existing = companies.findIndex(c => c.userId === profile.userId);
    if (existing >= 0) {
      const list = [...companies];
      list[existing] = updated;
      persistCompanies(list);
    } else {
      persistCompanies([...companies, updated]);
    }
  };

  const getCompanyByUserId = (userId: string) => companies.find(c => c.userId === userId);
  const getCompanyBySlug = (slug: string) => companies.find(c => c.slug === slug);

  const saveClassified = (item: StoredClassified) => {
    persistClassifieds([...classifieds, { ...item, createdAt: new Date().toISOString().split('T')[0] }]);
  };

  const updateClassified = (id: string, data: Partial<StoredClassified>) => {
    persistClassifieds(classifieds.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteClassified = (id: string) => {
    persistClassifieds(classifieds.filter(c => c.id !== id));
  };

  const getClassifiedsByUserId = (userId: string) => classifieds.filter(c => c.userId === userId);

  const getAllCompaniesAsCompany = (): Company[] => {
    return companies.map(c => ({
      id: c.userId,
      slug: c.slug,
      name: c.name,
      category: c.category,
      city: c.city,
      state: c.state || '',
      shortDescription: c.shortDescription || `${c.name} - ${c.category} em ${c.city}`,
      fullDescription: c.fullDescription || '',
      phone: c.phone,
      whatsapp: c.whatsapp || '',
      email: c.email,
      website: c.website || '',
      plan: c.plan,
      rating: 5.0,
      reviewCount: 0,
      logoUrl: c.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=6B6FD4&color=fff&size=128&bold=true`,
      coverUrl: c.coverUrl || '',
      gallery: [],
      address: c.address || '',
      workingHours: { 'Seg-Sex': '08:00 - 18:00', 'Sáb': '08:00 - 12:00', 'Dom': 'Fechado' },
      socials: { instagram: c.instagram || '', facebook: c.facebook || '' },
      services: [],
    }));
  };

  const getAllClassifiedsAsClassified = (): Classified[] => {
    return classifieds
      .filter(c => c.status === 'active')
      .map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        price: c.price ? parseFloat(c.price) : null,
        category: c.category,
        city: c.city,
        imageUrl: c.coverUrl || 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop',
        whatsapp: '',
        isFeatured: false,
        createdAt: c.createdAt,
        views: 0,
      }));
  };

  return (
    <DataStoreContext.Provider value={{
      companies, classifieds,
      saveCompany, getCompanyByUserId, getCompanyBySlug,
      saveClassified, updateClassified, deleteClassified, getClassifiedsByUserId,
      getAllCompaniesAsCompany, getAllClassifiedsAsClassified,
    }}>
      {children}
    </DataStoreContext.Provider>
  );
}

export const useDataStore = () => useContext(DataStoreContext);
