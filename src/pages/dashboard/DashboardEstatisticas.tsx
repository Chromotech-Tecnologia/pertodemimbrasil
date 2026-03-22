import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart3, Lock } from 'lucide-react';

const mockData = {
  views: [120, 145, 132, 178, 199, 156, 210, 245, 189, 203, 176, 234, 267, 198, 212, 189, 256, 278, 234, 198, 312, 289, 245, 267, 298, 312, 267, 289, 345, 312],
  sources: [{ name: 'Busca', value: 45 }, { name: 'Home', value: 25 }, { name: 'Destaque', value: 20 }, { name: 'Direto', value: 10 }],
  devices: [{ name: 'Mobile', value: 68 }, { name: 'Desktop', value: 27 }, { name: 'Tablet', value: 5 }],
};

export default function DashboardEstatisticas() {
  const { user } = useAuth();
  const isBasic = user?.plan === 'smart';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold">Estatísticas</h1>

        <div className="grid gap-4 sm:grid-cols-3">
          {mockData.sources.map(s => (
            <Card key={s.name}>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-extrabold text-primary">{s.value}%</p>
                <p className="text-sm text-muted-foreground">{s.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Visualizações (últimos 30 dias)</CardTitle></CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-1">
              {mockData.views.map((v, i) => (
                <div key={i} className="flex-1 rounded-t bg-primary/70 transition-all hover:bg-primary" style={{ height: `${(v / 345) * 100}%` }} title={`Dia ${i + 1}: ${v}`} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Dispositivos</CardTitle></CardHeader>
          <CardContent className="flex gap-4">
            {mockData.devices.map(d => (
              <div key={d.name} className="flex-1 text-center">
                <div className="mx-auto mb-2 h-3 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${d.value}%` }} />
                </div>
                <p className="text-lg font-bold">{d.value}%</p>
                <p className="text-xs text-muted-foreground">{d.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {isBasic && (
          <div className="relative">
            <Card className="opacity-40 blur-[2px]">
              <CardHeader><CardTitle>Dados Avançados</CardTitle></CardHeader>
              <CardContent className="h-48" />
            </Card>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg">
              <Lock className="h-8 w-8 text-primary" />
              <p className="font-bold">Dados avançados disponíveis no Plano Premium</p>
              <Link to="/dashboard/plano"><Button size="sm">Fazer upgrade →</Button></Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
