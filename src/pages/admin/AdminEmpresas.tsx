import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { useAuth, type User } from '@/lib/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlanBadge } from '@/components/PlanBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { PlanTier } from '@/lib/mock-data';
import { Pencil, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminEmpresas() {
  const { users, updateUserById, deleteUserById } = useAuth();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<User | null>(null);
  const [editPlan, setEditPlan] = useState<PlanTier>('smart');

  const companies = users.filter(u => u.role !== 'super_admin');
  const filtered = companies.filter(c =>
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (u: User) => { setEditing(u); setEditPlan(u.plan); };

  const saveEdit = () => {
    if (!editing) return;
    updateUserById(editing.id, { plan: editPlan });
    setEditing(null);
    toast({ title: 'Empresa atualizada!' });
  };

  const handleDelete = (u: User) => {
    if (confirm(`Excluir ${u.companyName}?`)) {
      deleteUserById(u.id);
      toast({ title: 'Empresa excluída.' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Gestão de Empresas</h1>
          <span className="text-sm text-muted-foreground">{companies.length} empresa(s)</span>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar empresa, email ou cidade..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="py-8 text-center text-muted-foreground">Nenhuma empresa encontrada</TableCell></TableRow>
                ) : filtered.map(u => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.companyName}</TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell className="text-xs">{u.email}</TableCell>
                    <TableCell><PlanBadge plan={u.plan} size="sm" /></TableCell>
                    <TableCell>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${u.planStatus === 'active' ? 'bg-green-500/10 text-green-500' : u.planStatus === 'trial' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-500'}`}>
                        {u.planStatus === 'active' ? '🟢 Ativo' : u.planStatus === 'trial' ? '🧪 Trial' : '🔴 Expirado'}
                      </span>
                    </TableCell>
                    <TableCell>{u.city}</TableCell>
                    <TableCell className="text-xs">{u.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(u)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(u)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={!!editing} onOpenChange={open => !open && setEditing(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Editar: {editing?.companyName}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Responsável</Label>
                <p className="text-sm">{editing?.name} ({editing?.email})</p>
              </div>
              <div>
                <Label>Alterar Plano</Label>
                <select value={editPlan} onChange={e => setEditPlan(e.target.value as PlanTier)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="smart">🆓 Smart (Grátis)</option>
                  <option value="pro">🥈 Pro (R$89/mês)</option>
                  <option value="premium">🥇 Premium (R$169/mês)</option>
                </select>
              </div>
              <Button className="w-full font-bold" onClick={saveEdit}>Salvar Alterações</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
