import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { mockClassifieds, categories } from '@/lib/mock-data';
import { useDataStore } from '@/lib/data-store';

export default function Classificados() {
  const { getAllClassifiedsAsClassified } = useDataStore();
  const realClassifieds = getAllClassifiedsAsClassified();
  const allClassifieds = useMemo(() => [...realClassifieds, ...mockClassifieds], [realClassifieds]);

  const [query, setQuery] = useState('');
  const [catFilter, setCatFilter] = useState('');

  const filtered = useMemo(() => {
    let list = [...allClassifieds];
    if (query) list = list.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));
    if (catFilter) list = list.filter(c => c.category === catFilter);
    // Real classifieds first, then featured mock
    list.sort((a, b) => {
      const aReal = realClassifieds.some(r => r.id === a.id) ? 0 : 1;
      const bReal = realClassifieds.some(r => r.id === b.id) ? 0 : 1;
      if (aReal !== bReal) return aReal - bReal;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
    return list;
  }, [query, catFilter, allClassifieds, realClassifieds]);

  return (
    <Layout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="mb-2 text-3xl font-extrabold">Classificados</h1>
          <p className="mb-8 text-muted-foreground">Anúncios de produtos e serviços da sua região</p>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar classificado..." value={query} onChange={e => setQuery(e.target.value)} className="pl-10" />
            </div>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Todas as categorias</option>
              {categories.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map(c => (
              <Link key={c.id} to={`/classificado/${c.id}`} className="card-hover overflow-hidden rounded-xl border border-border/50 bg-card">
                <div className="relative">
                  <img src={c.imageUrl} alt={c.title} className="h-44 w-full object-cover" loading="lazy" />
                  {c.isFeatured && <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white">🔥 DESTAQUE</span>}
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm line-clamp-1">{c.title}</h3>
                  {c.price && <p className="text-primary font-extrabold mt-1">R$ {c.price.toLocaleString('pt-BR')}</p>}
                  <p className="mt-1 text-xs text-muted-foreground">{c.city} · {c.category}</p>
                  <p className="text-xs text-muted-foreground">{c.createdAt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
