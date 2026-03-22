import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { categories, type PlanTier } from '@/lib/mock-data';
import { UserPlus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const plans: { key: PlanTier; name: string; price: string; badge: string }[] = [
  { key: 'smart', name: 'Smart', price: 'Grátis', badge: '🆓' },
  { key: 'pro', name: 'Pro', price: 'R$ 89/mês', badge: '🥈' },
  { key: 'premium', name: 'Premium', price: 'R$ 169/mês', badge: '🥇' },
];

export default function Cadastro() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [plan, setPlan] = useState<PlanTier>('smart');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const result = signup({ name, email, password, phone, companyName, category, city, plan });
      setLoading(false);
      if (result.success) {
        toast({ title: 'Conta criada!', description: 'Bem-vindo ao Perto de Mim!' });
        navigate('/dashboard');
      } else {
        toast({ title: 'Erro', description: result.error, variant: 'destructive' });
      }
    }, 500);
  };

  return (
    <Layout>
      <section className="flex min-h-[70vh] items-center justify-center py-12">
        <div className="mx-auto w-full max-w-lg px-4">
          <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-lg">
            <div className="mb-6 text-center">
              <UserPlus className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h1 className="text-2xl font-extrabold">Cadastre sua Empresa</h1>
              <p className="mt-1 text-sm text-muted-foreground">Passo {step} de 3</p>
              <div className="mx-auto mt-3 flex max-w-xs gap-2">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>Nome completo</Label>
                  <Input placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Senha</Label>
                  <Input type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input placeholder="(11) 99999-9999" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <Button className="w-full font-bold" disabled={!name || !email || !password || password.length < 6} onClick={() => setStep(2)}>
                  Próximo
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Nome da Empresa</Label>
                  <Input placeholder="Minha Empresa" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                </div>
                <div>
                  <Label>Categoria</Label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Selecione...</option>
                    {categories.map(c => <option key={c.slug} value={c.name}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Cidade</Label>
                  <Input placeholder="São Paulo" value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Voltar</Button>
                  <Button className="flex-1 font-bold" disabled={!companyName || !category || !city} onClick={() => setStep(3)}>Próximo</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground">Escolha seu plano:</p>
                <div className="space-y-3">
                  {plans.map(p => (
                    <button
                      key={p.key}
                      onClick={() => setPlan(p.key)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${plan === p.key ? 'border-primary bg-primary/10 shadow-md' : 'border-border/50 hover:border-primary/30'}`}
                    >
                      <span className="text-2xl">{p.badge}</span>
                      <div className="flex-1">
                        <p className="font-bold">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.price}</p>
                      </div>
                      {plan === p.key && <Check className="h-5 w-5 text-primary" />}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Voltar</Button>
                  <Button className="flex-1 font-bold" disabled={loading} onClick={handleSubmit}>
                    {loading ? 'Criando...' : 'Criar Conta'}
                  </Button>
                </div>
              </div>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Já tem conta? <Link to="/login" className="font-semibold text-primary hover:underline">Fazer login</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
