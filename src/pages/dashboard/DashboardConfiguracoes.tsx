import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

export default function DashboardConfiguracoes() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    updateUser({ name, email, phone });
    toast({ title: 'Configurações salvas!' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold">Configurações</h1>

        <Card>
          <CardHeader><CardTitle>Dados Pessoais</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div><Label>Nome</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
            <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div><Label>Telefone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Notificações</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium">Novas mensagens por email</p><p className="text-xs text-muted-foreground">Receber email quando alguém enviar uma mensagem</p></div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium">Relatório semanal</p><p className="text-xs text-muted-foreground">Resumo de desempenho toda segunda-feira</p></div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="font-semibold"><Save className="mr-2 h-4 w-4" /> Salvar Configurações</Button>

        <Card className="border-destructive/30">
          <CardHeader><CardTitle className="text-destructive">Zona de Perigo</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Ao excluir sua conta, todos os dados serão removidos permanentemente.</p>
            <Button variant="destructive" className="mt-4" size="sm">Excluir minha conta</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
