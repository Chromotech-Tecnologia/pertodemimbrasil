import { useParams } from 'react-router-dom';
import { Star, Phone, Mail, Globe, MapPin, Clock, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PlanBadge } from '@/components/PlanBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCompanies } from '@/lib/mock-data';
import { useDataStore } from '@/lib/data-store';

export default function EmpresaPerfil() {
  const { slug } = useParams();
  const { getAllCompaniesAsCompany } = useDataStore();
  const realCompanies = getAllCompaniesAsCompany();
  const allCompanies = [...realCompanies, ...mockCompanies];
  const company = allCompanies.find(c => c.slug === slug);

  if (!company) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Empresa não encontrada.</p>
        </div>
      </Layout>
    );
  }

  const isPremium = company.plan === 'premium';

  if (isPremium) {
    return (
      <Layout>
        <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(240,33%,5%)] via-[hsl(238,30%,12%)] to-[hsl(240,33%,8%)] py-24 sm:py-32">
          {company.coverUrl && (
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${company.coverUrl})` }} />
          )}
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <PlanBadge plan="premium" size="md" />
            <img src={company.logoUrl} alt={company.name} className="mx-auto mt-6 h-20 w-20 rounded-2xl shadow-lg object-cover" />
            <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-5xl" style={{ lineHeight: 1.1 }}>{company.name}</h1>
            <p className="mt-2 text-[hsl(240,15%,65%)]">{company.category} · {company.city}{company.state ? `, ${company.state}` : ''}</p>
            <div className="mt-3 flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(company.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
              ))}
              <span className="ml-2 text-sm text-white/60">{company.rating} ({company.reviewCount} avaliações)</span>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-green-600 font-bold hover:bg-green-700">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar no WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Phone className="mr-2 h-4 w-4" /> Ligar
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16" id="sobre">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-extrabold">Sobre Nós</h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">{company.fullDescription}</p>
          </div>
        </section>

        {company.services.length > 0 && (
          <section className="border-t border-border/30 bg-card/50 py-16" id="servicos">
            <div className="mx-auto max-w-5xl px-4">
              <h2 className="mb-8 text-center text-2xl font-extrabold">Nossos Serviços</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {company.services.map((s, i) => (
                  <div key={i} className="rounded-xl border border-border/50 bg-card p-5 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl">✦</div>
                    <h3 className="font-bold text-sm">{s}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16" id="contato">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-center text-2xl font-extrabold">Entre em Contato</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                {company.phone && <div className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-primary" /> <span>{company.phone}</span></div>}
                {company.email && <div className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-primary" /> <span>{company.email}</span></div>}
                {company.website && <div className="flex items-center gap-3 text-sm"><Globe className="h-4 w-4 text-primary" /> <a href={company.website} className="text-primary hover:underline">{company.website}</a></div>}
                {company.address && <div className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4 text-primary" /> <span>{company.address}, {company.city}{company.state ? ` - ${company.state}` : ''}</span></div>}
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="mt-0.5 h-4 w-4 text-primary" />
                  <div>{Object.entries(company.workingHours).map(([day, hours]) => <p key={day}><strong>{day}:</strong> {hours}</p>)}</div>
                </div>
                <div className="flex gap-3 pt-2">
                  {company.socials.facebook && <a href={company.socials.facebook} className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>}
                  {company.socials.instagram && <a href={company.socials.instagram} className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>}
                </div>
              </div>
              <form className="space-y-3 rounded-xl border border-border/50 bg-card p-6">
                <Input placeholder="Seu nome" />
                <Input placeholder="Seu email" type="email" />
                <textarea placeholder="Sua mensagem" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" rows={4} />
                <Button className="w-full font-semibold">Enviar mensagem</Button>
              </form>
            </div>
          </div>
        </section>

        {company.whatsapp && (
          <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-95">
            <MessageCircle className="h-6 w-6" />
          </a>
        )}
      </Layout>
    );
  }

  // Smart / Pro profile
  return (
    <Layout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          {company.coverUrl && (
            <div className="mb-6 h-48 w-full rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${company.coverUrl})` }} />
          )}
          <div className="flex items-start gap-4">
            <img src={company.logoUrl} alt={company.name} className="h-20 w-20 rounded-xl shadow object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold">{company.name}</h1>
                <PlanBadge plan={company.plan} />
              </div>
              <p className="text-sm text-muted-foreground">{company.category} · {company.city}{company.state ? `, ${company.state}` : ''}</p>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{company.rating}</span>
                <span className="text-xs text-muted-foreground">({company.reviewCount})</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-muted-foreground leading-relaxed">{company.fullDescription || company.shortDescription}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {company.phone && <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-primary" /> {company.phone}</div>}
              {company.email && <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-primary" /> {company.email}</div>}
              {company.website && <div className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-primary" /> <a href={company.website} className="text-primary hover:underline truncate">{company.website}</a></div>}
              {company.address && <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary" /> {company.address}</div>}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button className="bg-green-600 font-semibold hover:bg-green-700">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </Button>
            <Button variant="outline"><Phone className="mr-2 h-4 w-4" /> Ligar</Button>
          </div>

          {company.plan === 'smart' && (
            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center text-sm">
              <p className="font-semibold text-primary">Anúncio Básico</p>
              <p className="text-muted-foreground">Atualize seu plano para mais recursos: galeria de fotos, redes sociais, chatbot e muito mais.</p>
              <Button variant="outline" size="sm" className="mt-3">Ver planos</Button>
            </div>
          )}

          <div className="mt-8">
            <h2 className="mb-4 text-lg font-bold">Entre em contato</h2>
            <form className="space-y-3 rounded-xl border border-border/50 bg-card p-6">
              <Input placeholder="Seu nome" />
              <Input placeholder="Seu email" type="email" />
              <textarea placeholder="Sua mensagem" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" rows={4} />
              <Button className="w-full font-semibold">Enviar</Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
