import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PlanBadge } from '@/components/PlanBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCompanies, categories } from '@/lib/mock-data';

export default function Empresas() {
  const [query, setQuery] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    let list = [...mockCompanies];
    if (query) list = list.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    if (catFilter) list = list.filter(c => c.category === catFilter);
    const order: Record<string, number> = { premium: 0, pro: 1, smart: 2 };
    list.sort((a, b) => order[a.plan] - order[b.plan]);
    return list;
  }, [query, catFilter]);

  const pages = Math.ceil(filtered.length / perPage);
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Layout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="mb-2 text-3xl font-extrabold">Encontre Empresas</h1>
          <p className="mb-8 text-muted-foreground">Explore empresas por categoria, cidade ou nome</p>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar empresa..." value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} className="pl-10" />
            </div>
            <select
              value={catFilter}
              onChange={e => { setCatFilter(e.target.value); setPage(1); }}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todas as categorias</option>
              {categories.map(c => <option key={c.slug} value={c.name}>{c.icon} {c.name}</option>)}
            </select>
          </div>

          {visible.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <p className="text-lg font-semibold">Nenhuma empresa encontrada</p>
              <p className="text-sm">Tente ajustar seus filtros</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map(c => (
                <Link key={c.id} to={`/empresa/${c.slug}`} className="card-hover overflow-hidden rounded-xl border border-border/50 bg-card">
                  <div className="flex items-start gap-3 p-4">
                    <img src={c.logoUrl} alt={c.name} className="h-14 w-14 rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-bold text-sm">{c.name}</h3>
                        <PlanBadge plan={c.plan} />
                      </div>
                      <p className="text-xs text-muted-foreground">{c.category} · {c.city}, {c.state}</p>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold tabular-nums">{c.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border/30 px-4 py-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">{c.shortDescription}</p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">Ver perfil</Button>
                      <Button size="sm" className="bg-green-600 text-xs hover:bg-green-700">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {pages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${page === i + 1 ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-accent'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
