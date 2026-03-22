import { AdminLayout } from '@/components/AdminLayout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminFinanceiro() {
  const { users } = useAuth();
  const companies = users.filter(u => u.role !== 'super_admin');
  const premiumCount = companies.filter(c => c.plan === 'premium').length;
  const proCount = companies.filter(c => c.plan === 'pro').length;
  const mrr = premiumCount * 169 + proCount * 89;

  const mockInvoices = companies.filter(c => c.plan !== 'smart').map((c, i) => ({
    id: `inv-${i}`,
    company: c.companyName,
    plan: c.plan,
    amount: c.plan === 'premium' ? 169 : 89,
    status: 'Pago',
    date: c.createdAt,
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold">Financeiro</h1>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card><CardContent className="p-5 text-center"><p className="text-3xl font-extrabold text-green-500">R$ {mrr.toLocaleString()}</p><p className="text-sm text-muted-foreground">MRR</p></CardContent></Card>
          <Card><CardContent className="p-5 text-center"><p className="text-3xl font-extrabold text-primary">{premiumCount + proCount}</p><p className="text-sm text-muted-foreground">Assinantes ativos</p></CardContent></Card>
          <Card><CardContent className="p-5 text-center"><p className="text-3xl font-extrabold">0%</p><p className="text-sm text-muted-foreground">Churn rate</p></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Assinaturas</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">Nenhuma assinatura</TableCell></TableRow>
                ) : mockInvoices.map(inv => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.company}</TableCell>
                    <TableCell className="capitalize">{inv.plan}</TableCell>
                    <TableCell>R$ {inv.amount},00</TableCell>
                    <TableCell><span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-500">{inv.status}</span></TableCell>
                    <TableCell className="text-xs">{inv.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
