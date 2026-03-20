import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { planFeatures, faqItems } from '@/lib/mock-data';

const plans = [
  { name: 'Smart', badge: 'PROMOÇÃO LIMITADA', badgeClass: 'bg-muted text-muted-foreground', priceOld: 89, price: 0, priceLabel: 'GRÁTIS', key: 'smart' as const, cta: 'Cadastrar Grátis', highlight: false },
  { name: 'Pro', badge: 'MAIS POPULAR', badgeClass: 'bg-primary text-primary-foreground', priceOld: 128, price: 89, priceLabel: null, key: 'pro' as const, cta: 'Assinar Plano Pro', highlight: true },
  { name: 'Premium', badge: 'MELHOR CUSTO-BENEFÍCIO', badgeClass: 'badge-premium', priceOld: 249, price: 169, priceLabel: null, key: 'premium' as const, cta: 'Assinar Premium', highlight: false },
];

export default function Planos() {
  const [annual, setAnnual] = useState(false);
  const planFaq = faqItems.filter(f => f.category === 'Planos' || f.category === 'Pagamento');

  return (
    <Layout>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl text-balance">Coloque sua empresa na internet hoje!</h1>
          <p className="mb-8 text-muted-foreground">Perto de Mim conecta clientes e empresas. Escolha o plano ideal.</p>

          <div className="mb-12 inline-flex items-center gap-3 rounded-full border border-border bg-card p-1">
            <button onClick={() => setAnnual(false)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!annual ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Mensal</button>
            <button onClick={() => setAnnual(true)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${annual ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Anual <span className="text-xs opacity-80">-20%</span></button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map(plan => {
              const monthlyPrice = plan.price;
              const displayPrice = annual ? Math.round(monthlyPrice * 0.8) : monthlyPrice;
              return (
                <div key={plan.key} className={`relative rounded-2xl border bg-card p-6 text-left ${plan.highlight ? 'border-primary shadow-lg shadow-primary/10 scale-[1.02]' : 'border-border/50'}`}>
                  <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold ${plan.badgeClass}`}>{plan.badge}</span>
                  <h3 className="mt-4 text-xl font-extrabold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground line-through">R$ {plan.priceOld},00</span>
                    {plan.priceLabel ? (
                      <p className="text-3xl font-extrabold text-primary">{plan.priceLabel}</p>
                    ) : (
                      <p className="text-3xl font-extrabold">R$ {displayPrice}<span className="text-base font-semibold text-muted-foreground">,00/mês</span></p>
                    )}
                  </div>
                  <ul className="mt-6 space-y-2">
                    {planFeatures.map((f, i) => {
                      const active = f[plan.key];
                      return (
                        <li key={i} className={`flex items-start gap-2 text-sm ${active ? '' : 'text-muted-foreground/50'}`}>
                          {active ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
                          <span>{f.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <Link to="/cadastro" className="mt-6 block">
                    <Button className={`w-full font-bold ${plan.highlight ? '' : 'variant-outline'}`} variant={plan.highlight ? 'default' : 'outline'}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h3 className="text-lg font-bold">APAREÇA NAS PESQUISAS DO GOOGLE</h3>
            <p className="mt-2 text-sm text-muted-foreground">quando os clientes procurarem por produtos ou serviços como os seus</p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl text-left">
            <h3 className="mb-6 text-center text-xl font-bold">Perguntas Frequentes</h3>
            <Accordion type="multiple">
              {planFaq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-sm">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12">
            <p className="text-muted-foreground">Ainda tem dúvidas?</p>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="mt-3 font-semibold">Fale conosco no WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
