import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const models = [
  { name: 'Elegance', desc: 'Moderno/Escuro — Hero com overlay, cores escuras elegantes', color: 'from-purple-900 to-gray-900' },
  { name: 'Vibrant', desc: 'Colorido/Energético — Formas geométricas, gradientes vibrantes', color: 'from-pink-500 to-orange-400' },
  { name: 'Clean Pro', desc: 'Minimalista/Corporativo — Layout limpo, tipografia marcante', color: 'from-gray-100 to-white' },
];

export default function DashboardLandingPage() {
  const { user } = useAuth();
  const isPremium = user?.plan === 'premium';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold">Minha Landing Page</h1>

        {!isPremium ? (
          <Card className="relative overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <Lock className="h-12 w-12 text-primary" />
              <h2 className="text-xl font-bold">Landing Page disponível no Plano Premium</h2>
              <p className="text-sm text-muted-foreground">Crie uma página profissional para sua empresa com modelos exclusivos.</p>
              <Link to="/dashboard/plano"><Button className="font-semibold">Upgrade para Premium →</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">Escolha um modelo para sua landing page:</p>
            <div className="grid gap-4 md:grid-cols-3">
              {models.map(m => (
                <Card key={m.name} className="card-hover cursor-pointer overflow-hidden">
                  <div className={`h-32 bg-gradient-to-br ${m.color}`} />
                  <CardContent className="p-4">
                    <h3 className="font-bold">{m.name}</h3>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">Selecionar</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
