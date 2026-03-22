import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        const stored = JSON.parse(localStorage.getItem('pdm_user') || '{}');
        navigate(stored.role === 'super_admin' ? '/admin' : '/dashboard');
      } else {
        toast({ title: 'Erro', description: result.error, variant: 'destructive' });
      }
    }, 500);
  };

  return (
    <Layout>
      <section className="flex min-h-[70vh] items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-lg">
            <div className="mb-6 text-center">
              <LogIn className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h1 className="text-2xl font-extrabold">Entrar na sua conta</h1>
              <p className="mt-1 text-sm text-muted-foreground">Acesse seu painel e gerencie sua empresa</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input id="password" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full font-bold" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
            <div className="mt-6 space-y-2 text-center text-sm">
              <p className="text-muted-foreground">
                Não tem conta?{' '}
                <Link to="/cadastro" className="font-semibold text-primary hover:underline">Cadastre-se grátis</Link>
              </p>
            </div>
            <div className="mt-4 rounded-lg border border-border/50 bg-muted/30 p-3 text-xs text-muted-foreground">
              <p className="font-semibold">Admin provisório:</p>
              <p>Email: admin@pertodemim.com.br</p>
              <p>Senha: admin123</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
