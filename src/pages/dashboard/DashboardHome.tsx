import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, MousePointerClick, MessageSquare, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Visualizações', value: 1247, icon: Eye, change: '+12%' },
  { label: 'Cliques WhatsApp', value: 89, icon: MousePointerClick, change: '+8%' },
  { label: 'Mensagens', value: 23, icon: MessageSquare, change: '+15%' },
  { label: 'Aparições em buscas', value: 456, icon: Search, change: '+5%' },
];

const recentActivity = [
  { text: 'Alguém clicou no seu WhatsApp', time: 'há 2h' },
  { text: 'Seu perfil foi visualizado 15x hoje', time: 'há 3h' },
  { text: 'Nova mensagem de contato recebida', time: 'há 5h' },
  { text: 'Sua empresa apareceu em 23 buscas', time: 'há 8h' },
];

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">Olá, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-sm text-muted-foreground">Veja como sua empresa está performando</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(s => (
            <Card key={s.label} className="card-hover">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">{s.value.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
                <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-green-500">
                  <TrendingUp className="h-3 w-3" /> {s.change}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {user?.plan === 'smart' && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center sm:flex-row sm:text-left">
              <div className="flex-1">
                <h3 className="font-bold">🚀 Desbloqueie mais recursos!</h3>
                <p className="text-sm text-muted-foreground">Faça upgrade para o Plano Pro ou Premium e alcance mais clientes.</p>
              </div>
              <Link to="/dashboard/plano"><Button size="sm" className="font-semibold">Ver Planos</Button></Link>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle className="text-lg">Atividades Recentes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border/30 p-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="flex-1 text-sm">{a.text}</span>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
