import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Contato() {
  return (
    <Layout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="mb-2 text-center text-3xl font-extrabold">Entre em Contato</h1>
          <p className="mb-12 text-center text-muted-foreground">Estamos prontos para ajudar você</p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><MessageCircle className="h-5 w-5" /></div>
                <div><p className="font-bold text-sm">WhatsApp</p><p className="text-sm text-muted-foreground">(11) 99999-9999</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
                <div><p className="font-bold text-sm">Email</p><p className="text-sm text-muted-foreground">contato@pertodemimbrasil.com.br</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Phone className="h-5 w-5" /></div>
                <div><p className="font-bold text-sm">Telefone</p><p className="text-sm text-muted-foreground">(11) 3333-3333</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></div>
                <div><p className="font-bold text-sm">Endereço</p><p className="text-sm text-muted-foreground">São Paulo, SP — Brasil</p></div>
              </div>
              <div className="overflow-hidden rounded-xl border border-border/50">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0488!2d-46.875!3d-23.6821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1" width="100%" height="200" style={{ border: 0 }} loading="lazy" title="Mapa" />
              </div>
            </div>

            <form className="space-y-4 rounded-xl border border-border/50 bg-card p-6">
              <Input placeholder="Seu nome" />
              <Input placeholder="Seu email" type="email" />
              <Input placeholder="Seu telefone" type="tel" />
              <Input placeholder="Assunto" />
              <textarea placeholder="Sua mensagem" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" rows={5} />
              <Button className="w-full font-semibold">Enviar Mensagem</Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
