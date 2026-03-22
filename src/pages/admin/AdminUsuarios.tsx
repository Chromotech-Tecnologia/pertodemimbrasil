import { AdminLayout } from '@/components/AdminLayout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlanBadge } from '@/components/PlanBadge';

export default function AdminUsuarios() {
  const { users } = useAuth();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold">Gestão de Usuários</h1>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Cadastro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-xs">{u.email}</TableCell>
                    <TableCell className="text-xs">{u.phone}</TableCell>
                    <TableCell>{u.companyName}</TableCell>
                    <TableCell><PlanBadge plan={u.plan} size="sm" /></TableCell>
                    <TableCell>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${u.role === 'super_admin' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                        {u.role === 'super_admin' ? 'Admin' : 'Usuário'}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{u.createdAt}</TableCell>
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
