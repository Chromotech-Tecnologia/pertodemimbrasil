import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems } from '@/lib/mock-data';

const faqCategories = ['Geral', 'Empresas', 'Planos', 'Pagamento', 'Técnico'];

export default function FAQ() {
  const [activeCat, setActiveCat] = useState('Geral');
  const items = faqItems.filter(f => f.category === activeCat);

  return (
    <Layout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="mb-2 text-center text-3xl font-extrabold">Perguntas Frequentes</h1>
          <p className="mb-8 text-center text-muted-foreground">Encontre respostas para as dúvidas mais comuns</p>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {faqCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeCat === cat ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border border-border hover:bg-accent/50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Accordion type="multiple">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
