import { AdminLayout } from '@/components/AdminLayout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, CreditCard, TrendingUp, Eye, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const { users } = useAuth();
  const companies = users.filter(u => u.role !== 'super_admin');
  const premiumCount = companies.filter(c => c.plan === 'premium').length;
  const proCount = companies.filter(c => c.plan === 'pro').length;
  const smartCount = companies.filter(c => c.plan === 'smart').length;
  const mrr = premiumCount * 169 + proCount * 89;

  const kpis = [
    { label: 'Total Empresas', value: companies.length, icon: Building2, color: 'text-primary' },
    { label: 'Usuários', value: users.length, icon: Users, color: 'text-primary' },
    { label: 'MRR', value: `R$ ${mrr.toLocaleString()}`, icon: CreditCard, color: 'text-green-500' },
    { label: 'Visualizações', value: '12.4k', icon: Eye, color: 'text-primary' },
    { label: 'Interações', value: '3.2k', icon: MessageSquare, color: 'text-primary' },
    { label: 'Crescimento', value: '+15%', icon: TrendingUp, color: 'text-green-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold">Dashboard Geral</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map(k => (
            <Card key={k.label} className="card-hover">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <k.icon className={`h-6 w-6 ${k.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">{k.value}</p>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-5">
            <h3 className="mb-3 font-bold">Distribuição por Plano</h3>
            <div className="flex gap-4">
              {[{ name: 'Premium', count: premiumCount, cls: 'bg-yellow-500' }, { name: 'Pro', count: proCount, cls: 'bg-gray-400' }, { name: 'Smart', count: smartCount, cls: 'bg-muted-foreground' }].map(p => (
                <div key={p.name} className="flex-1 text-center">
                  <div className="mx-auto mb-2 h-3 w-full rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${p.cls}`} style={{ width: companies.length ? `${(p.count / companies.length) * 100}%` : '0%' }} />
                  </div>
                  <p className="text-lg font-bold">{p.count}</p>
                  <p className="text-xs text-muted-foreground">{p.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
