import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const team = [
  { name: 'Lucas Mendes', role: 'CEO & Fundador', initials: 'LM' },
  { name: 'Camila Rocha', role: 'Diretora de Produto', initials: 'CR' },
  { name: 'Rafael Oliveira', role: 'CTO', initials: 'RO' },
  { name: 'Juliana Santos', role: 'Marketing Digital', initials: 'JS' },
];

const stats = [
  { number: '2.500+', label: 'Empresas cadastradas' },
  { number: '150+', label: 'Cidades atendidas' },
  { number: '50.000+', label: 'Clientes conectados' },
  { number: '4.8', label: 'Avaliação média' },
];

export default function Sobre() {
  return (
    <Layout>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl text-balance text-center">Sobre o Perto de Mim</h1>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground text-pretty">
            Nascemos com a missão de democratizar a presença digital para pequenos e médios negócios no Brasil.
          </p>

          <div className="mb-16 space-y-6 text-muted-foreground leading-relaxed">
            <p>O Perto de Mim foi criado em 2023 com um objetivo claro: ajudar empresas locais a serem encontradas por clientes da sua região. Sabemos que a maioria dos pequenos negócios brasileiros ainda não tem presença digital adequada, e queremos mudar isso.</p>
            <p>Nossa plataforma funciona como um diretório completo, marketplace de classificados e construtor de landing pages — tudo em um só lugar. Acreditamos que toda empresa merece ser vista, independentemente do seu tamanho.</p>
          </div>

          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-extrabold">Missão, Visão e Valores</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Missão', text: 'Conectar clientes e empresas locais de forma simples, acessível e eficiente.' },
                { title: 'Visão', text: 'Ser a maior plataforma de negócios locais do Brasil até 2026.' },
                { title: 'Valores', text: 'Transparência, simplicidade, inovação e compromisso com o empreendedor brasileiro.' },
              ].map(item => (
                <div key={item.title} className="rounded-xl border border-border/50 bg-card p-6 text-center">
                  <h3 className="mb-2 font-bold text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-extrabold">Nossa Equipe</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map(m => (
                <div key={m.name} className="rounded-xl border border-border/50 bg-card p-6 text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">{m.initials}</div>
                  <h3 className="font-bold text-sm">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="rounded-xl border border-border/50 bg-card p-6 text-center">
                <p className="text-2xl font-extrabold text-primary">{s.number}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/cadastro"><Button size="lg" className="font-bold">Cadastre sua empresa</Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
