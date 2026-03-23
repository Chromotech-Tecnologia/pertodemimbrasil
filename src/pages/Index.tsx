import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Star, MessageCircle, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PlanBadge } from '@/components/PlanBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories, mockCompanies, mockClassifieds, testimonials } from '@/lib/mock-data';
import { useDataStore } from '@/lib/data-store';

function HeroSection() {
  const [query, setQuery] = useState('');
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(240,33%,5%)] via-[hsl(238,30%,12%)] to-[hsl(240,33%,5%)] py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-primary/40" style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            animation: `pulse ${3 + Math.random() * 4}s ease-in-out infinite`,
          }} />
        ))}
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <img src="/logo-colorida.png" alt="Perto de Mim" className="mx-auto mb-8 h-14 sm:h-16" />
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl text-balance" style={{ lineHeight: 1.1 }}>
          Encontre tudo que precisa,<br />perto de você!
        </h1>
        <p className="mb-8 text-base text-[hsl(240,15%,70%)] sm:text-lg text-pretty">
          Empresas, produtos e serviços da sua região em um só lugar
        </p>
        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="O que você procura?"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="h-12 border-0 bg-white/10 pl-10 text-white placeholder:text-white/40 backdrop-blur-sm focus-visible:ring-primary"
            />
          </div>
          <Button size="lg" className="h-12 px-8 font-bold">
            <Search className="mr-2 h-4 w-4" /> Buscar
          </Button>
        </div>
        <Link to="/cadastro" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          Anuncie sua empresa — Grátis! <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-2 text-center text-2xl font-extrabold sm:text-3xl">Explore por Categoria</h2>
        <p className="mb-10 text-center text-muted-foreground">Encontre o que precisa de forma rápida</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/empresas?categoria=${cat.slug}`}
              className="card-hover flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4 text-center transition-all"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCompanies() {
  const { getAllCompaniesAsCompany } = useDataStore();
  const realCompanies = getAllCompaniesAsCompany();
  const allCompanies = [...realCompanies, ...mockCompanies];
  const featured = allCompanies.filter(c => c.plan === 'premium').slice(0, 6);

  return (
    <section className="border-t border-border/30 bg-card/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-1 text-center text-2xl font-extrabold sm:text-3xl">⭐ Empresas em Destaque</h2>
        <p className="mb-10 text-center text-muted-foreground">Parceiros verificados e premium da plataforma</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(c => (
            <Link key={c.id} to={`/empresa/${c.slug}`} className="card-hover group overflow-hidden rounded-xl border border-primary/20 bg-card shadow-md">
              <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5" style={c.coverUrl ? { backgroundImage: `url(${c.coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                <div className="absolute right-3 top-3"><PlanBadge plan="premium" /></div>
                <img src={c.logoUrl} alt={c.name} className="absolute -bottom-6 left-4 h-16 w-16 rounded-xl border-2 border-card shadow-lg object-cover" />
              </div>
              <div className="px-4 pb-4 pt-8">
                <h3 className="font-bold text-foreground">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.category} · {c.city}{c.state ? `, ${c.state}` : ''}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold tabular-nums">{c.rating}</span>
                  <span className="text-xs text-muted-foreground">({c.reviewCount})</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">Ver mais</Button>
                  <Button size="sm" className="bg-green-600 text-xs hover:bg-green-700">
                    <MessageCircle className="mr-1 h-3 w-3" /> WhatsApp
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/empresas">
            <Button variant="outline">Ver todas as empresas <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ClassifiedsSection() {
  const { getAllClassifiedsAsClassified } = useDataStore();
  const realClassifieds = getAllClassifiedsAsClassified();
  const allClassifieds = [...realClassifieds, ...mockClassifieds];
  const featured = allClassifieds.filter(c => c.isFeatured || realClassifieds.some(r => r.id === c.id)).slice(0, 4);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-1 text-center text-2xl font-extrabold sm:text-3xl">🔥 Classificados em Alta</h2>
        <p className="mb-10 text-center text-muted-foreground">Os anúncios mais procurados</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(c => (
            <Link key={c.id} to={`/classificado/${c.id}`} className="card-hover overflow-hidden rounded-xl border border-border/50 bg-card">
              <img src={c.imageUrl} alt={c.title} className="h-40 w-full object-cover" loading="lazy" />
              <div className="p-3">
                <h3 className="font-bold text-sm text-foreground line-clamp-1">{c.title}</h3>
                {c.price && <p className="text-primary font-extrabold mt-1">R$ {c.price.toLocaleString('pt-BR')}</p>}
                <p className="mt-1 text-xs text-muted-foreground">{c.city} · {c.category}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/classificados">
            <Button variant="outline">Ver todos os classificados <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: '📝', title: 'Cadastre sua empresa', desc: 'Crie sua conta grátis em menos de 2 minutos. Sem burocracia.' },
    { icon: '🚀', title: 'Escolha seu plano', desc: 'Comece grátis ou escolha o plano ideal para crescer mais rápido.' },
    { icon: '📈', title: 'Receba clientes', desc: 'Apareça nas buscas e receba contatos diretamente no WhatsApp.' },
  ];
  return (
    <section className="border-t border-border/30 bg-card/50 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">Como funciona</h2>
        <p className="mb-12 text-muted-foreground">Três passos simples para divulgar seu negócio</p>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <span className="text-5xl">{s.icon}</span>
              <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Passo {i + 1}</span>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{s.desc}</p>
            </div>
          ))}
        </div>
        <Link to="/cadastro" className="mt-10 inline-block">
          <Button size="lg" className="font-bold">Comece agora — É grátis!</Button>
        </Link>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-extrabold sm:text-3xl">O que dizem nossos parceiros</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-sm">{t.avatar}</div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-pretty leading-relaxed">"{t.text}"</p>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedCompanies />
      <ClassifiedsSection />
      <HowItWorks />
      <TestimonialsSection />
    </Layout>
  );
}
