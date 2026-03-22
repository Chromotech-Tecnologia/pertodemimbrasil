import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

export default function DashboardEmpresa() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({
    companyName: user?.companyName || '',
    category: user?.category || '',
    city: user?.city || '',
    phone: user?.phone || '',
    email: user?.email || '',
    shortDescription: '',
    fullDescription: '',
    whatsapp: '',
    website: '',
    address: '',
    instagram: '',
    facebook: '',
  });

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSave = () => {
    updateUser({ companyName: form.companyName, category: form.category, city: form.city, phone: form.phone });
    toast({ title: 'Salvo!', description: 'Dados da empresa atualizados.' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Minha Empresa</h1>
          <Button onClick={handleSave} className="font-semibold"><Save className="mr-2 h-4 w-4" /> Salvar</Button>
        </div>

        <Card>
          <CardHeader><CardTitle>Informações Básicas</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div><Label>Nome da Empresa</Label><Input value={form.companyName} onChange={e => update('companyName', e.target.value)} /></div>
            <div>
              <Label>Categoria</Label>
              <select value={form.category} onChange={e => update('category', e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {categories.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2"><Label>Descrição curta (160 chars)</Label><Input maxLength={160} value={form.shortDescription} onChange={e => update('shortDescription', e.target.value)} placeholder="Descrição breve da empresa..." /></div>
            <div className="sm:col-span-2"><Label>Descrição completa</Label><Textarea rows={4} value={form.fullDescription} onChange={e => update('fullDescription', e.target.value)} placeholder="Conte sobre sua empresa..." /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Contato e Localização</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div><Label>Telefone</Label><Input value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
            <div><Label>WhatsApp</Label><Input value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} placeholder="5511999999999" /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => update('email', e.target.value)} /></div>
            <div><Label>Website</Label><Input value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://..." /></div>
            <div><Label>Cidade</Label><Input value={form.city} onChange={e => update('city', e.target.value)} /></div>
            <div><Label>Endereço</Label><Input value={form.address} onChange={e => update('address', e.target.value)} placeholder="Rua, número, bairro" /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Redes Sociais</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div><Label>Instagram</Label><Input value={form.instagram} onChange={e => update('instagram', e.target.value)} placeholder="@suaempresa" /></div>
            <div><Label>Facebook</Label><Input value={form.facebook} onChange={e => update('facebook', e.target.value)} placeholder="facebook.com/suaempresa" /></div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
