import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Plan {
  id: string; name: string; priceMonthly: number; priceOriginal: number; priceAnnual: number;
  badgeText: string; badgeColor: string; displayOrder: number; isActive: boolean;
  features: { name: string; active: boolean }[];
  hasLandingPage: boolean; hasChatbot: boolean; hasHomeHighlight: boolean; hasSearchPriority: boolean; hasGoogleAds: boolean;
  maxPhotos: number; maxClassifieds: number;
}

const defaultPlans: Plan[] = [
  {
    id: 'plan-smart', name: 'Smart', priceMonthly: 0, priceOriginal: 89, priceAnnual: 0,
    badgeText: 'PROMOÇÃO LIMITADA', badgeColor: '#94a3b8', displayOrder: 1, isActive: true,
    features: [
      { name: 'Divulgar telefone, email, página da empresa', active: true },
      { name: 'Mensagens ilimitadas WhatsApp', active: true },
      { name: 'Divulgação em redes sociais', active: false },
      { name: 'Chatbot inteligente', active: false },
      { name: 'Aparecer na página inicial', active: false },
      { name: 'Landing Page exclusiva', active: false },
    ],
    hasLandingPage: false, hasChatbot: false, hasHomeHighlight: false, hasSearchPriority: false, hasGoogleAds: false,
    maxPhotos: 3, maxClassifieds: 2,
  },
  {
    id: 'plan-pro', name: 'Pro', priceMonthly: 89, priceOriginal: 128, priceAnnual: 71,
    badgeText: 'MAIS POPULAR', badgeColor: '#6B6FD4', displayOrder: 2, isActive: true,
    features: [
      { name: 'Divulgar telefone, email, página da empresa', active: true },
      { name: 'Mensagens ilimitadas WhatsApp', active: true },
      { name: 'Divulgação em redes sociais', active: true },
      { name: 'Chatbot inteligente', active: true },
      { name: 'Aparecer na página inicial', active: true },
      { name: 'Landing Page exclusiva', active: false },
    ],
    hasLandingPage: false, hasChatbot: true, hasHomeHighlight: true, hasSearchPriority: false, hasGoogleAds: false,
    maxPhotos: 6, maxClassifieds: 5,
  },
  {
    id: 'plan-premium', name: 'Premium', priceMonthly: 169, priceOriginal: 249, priceAnnual: 135,
    badgeText: 'MELHOR CUSTO-BENEFÍCIO', badgeColor: '#ffd700', displayOrder: 3, isActive: true,
    features: [
      { name: 'Divulgar telefone, email, página da empresa', active: true },
      { name: 'Mensagens ilimitadas WhatsApp', active: true },
      { name: 'Divulgação em redes sociais', active: true },
      { name: 'Chatbot inteligente', active: true },
      { name: 'Aparecer na página inicial', active: true },
      { name: 'Landing Page exclusiva', active: true },
    ],
    hasLandingPage: true, hasChatbot: true, hasHomeHighlight: true, hasSearchPriority: true, hasGoogleAds: true,
    maxPhotos: 20, maxClassifieds: 20,
  },
];

export default function AdminPlanos() {
  const [plans, setPlans] = useState<Plan[]>(() => {
    const stored = localStorage.getItem('pdm_plans');
    return stored ? JSON.parse(stored) : defaultPlans;
  });
  const [editing, setEditing] = useState<Plan | null>(null);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const persist = (updated: Plan[]) => {
    setPlans(updated);
    localStorage.setItem('pdm_plans', JSON.stringify(updated));
  };

  const [form, setForm] = useState<Partial<Plan>>({});

  const openCreate = () => {
    setForm({ name: '', priceMonthly: 0, priceOriginal: 0, priceAnnual: 0, badgeText: '', badgeColor: '#6B6FD4', displayOrder: plans.length + 1, isActive: true, features: [], hasLandingPage: false, hasChatbot: false, hasHomeHighlight: false, hasSearchPriority: false, hasGoogleAds: false, maxPhotos: 5, maxClassifieds: 5 });
    setCreating(true);
  };

  const openEdit = (p: Plan) => { setForm({ ...p }); setEditing(p); };

  const saveCreate = () => {
    const newPlan: Plan = { ...form, id: `plan-${Date.now()}`, features: form.features || [] } as Plan;
    persist([...plans, newPlan]);
    setCreating(false);
    toast({ title: 'Plano criado!' });
  };

  const saveEdit = () => {
    if (!editing) return;
    persist(plans.map(p => p.id === editing.id ? { ...editing, ...form } as Plan : p));
    setEditing(null);
    toast({ title: 'Plano atualizado!' });
  };

  const deletePlan = (id: string) => {
    persist(plans.filter(p => p.id !== id));
    toast({ title: 'Plano excluído.' });
  };

  const toggleActive = (id: string) => {
    persist(plans.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const addFeature = () => {
    setForm(f => ({ ...f, features: [...(f.features || []), { name: '', active: true }] }));
  };

  const updateFeature = (idx: number, field: 'name' | 'active', value: string | boolean) => {
    setForm(f => ({
      ...f,
      features: (f.features || []).map((feat, i) => i === idx ? { ...feat, [field]: value } : feat),
    }));
  };

  const removeFeature = (idx: number) => {
    setForm(f => ({ ...f, features: (f.features || []).filter((_, i) => i !== idx) }));
  };

  const renderForm = (onSave: () => void) => (
    <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Nome</Label><Input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
        <div><Label>Badge</Label><Input value={form.badgeText || ''} onChange={e => setForm(f => ({ ...f, badgeText: e.target.value }))} /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><Label>Preço mensal (R$)</Label><Input type="number" value={form.priceMonthly ?? 0} onChange={e => setForm(f => ({ ...f, priceMonthly: +e.target.value }))} /></div>
        <div><Label>Preço original</Label><Input type="number" value={form.priceOriginal ?? 0} onChange={e => setForm(f => ({ ...f, priceOriginal: +e.target.value }))} /></div>
        <div><Label>Preço anual</Label><Input type="number" value={form.priceAnnual ?? 0} onChange={e => setForm(f => ({ ...f, priceAnnual: +e.target.value }))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Máx. Fotos</Label><Input type="number" value={form.maxPhotos ?? 5} onChange={e => setForm(f => ({ ...f, maxPhotos: +e.target.value }))} /></div>
        <div><Label>Máx. Classificados</Label><Input type="number" value={form.maxClassifieds ?? 5} onChange={e => setForm(f => ({ ...f, maxClassifieds: +e.target.value }))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="flex items-center justify-between"><Label>Landing Page</Label><Switch checked={form.hasLandingPage} onCheckedChange={v => setForm(f => ({ ...f, hasLandingPage: v }))} /></div>
        <div className="flex items-center justify-between"><Label>Chatbot</Label><Switch checked={form.hasChatbot} onCheckedChange={v => setForm(f => ({ ...f, hasChatbot: v }))} /></div>
        <div className="flex items-center justify-between"><Label>Destaque Home</Label><Switch checked={form.hasHomeHighlight} onCheckedChange={v => setForm(f => ({ ...f, hasHomeHighlight: v }))} /></div>
        <div className="flex items-center justify-between"><Label>Google Ads</Label><Switch checked={form.hasGoogleAds} onCheckedChange={v => setForm(f => ({ ...f, hasGoogleAds: v }))} /></div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Recursos</Label>
          <Button variant="outline" size="sm" onClick={addFeature}><Plus className="mr-1 h-3 w-3" />Adicionar</Button>
        </div>
        {(form.features || []).map((feat, i) => (
          <div key={i} className="mb-2 flex items-center gap-2">
            <Switch checked={feat.active} onCheckedChange={v => updateFeature(i, 'active', v)} />
            <Input className="flex-1" value={feat.name} onChange={e => updateFeature(i, 'name', e.target.value)} placeholder="Nome do recurso" />
            <Button variant="ghost" size="icon" onClick={() => removeFeature(i)}><X className="h-4 w-4 text-destructive" /></Button>
          </div>
        ))}
      </div>
      <Button className="w-full font-bold" onClick={onSave}>Salvar</Button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Gestão de Planos</h1>
          <Button onClick={openCreate} className="font-semibold"><Plus className="mr-2 h-4 w-4" /> Novo Plano</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.sort((a, b) => a.displayOrder - b.displayOrder).map(plan => (
            <Card key={plan.id} className={`${!plan.isActive ? 'opacity-50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <Switch checked={plan.isActive} onCheckedChange={() => toggleActive(plan.id)} />
                </div>
                <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: plan.badgeColor, color: '#fff' }}>{plan.badgeText}</span>
                <p className="text-xl font-extrabold">
                  {plan.priceMonthly === 0 ? 'Grátis' : `R$ ${plan.priceMonthly}`}
                  {plan.priceMonthly > 0 && <span className="text-xs font-normal text-muted-foreground">/mês</span>}
                </p>
              </CardHeader>
              <CardContent className="space-y-1">
                {plan.features.map((f, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs ${f.active ? '' : 'text-muted-foreground/40'}`}>
                    {f.active ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3" />}
                    <span>{f.name}</span>
                  </div>
                ))}
                <div className="flex gap-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(plan)}>
                    <Pencil className="mr-1 h-3 w-3" /> Editar
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deletePlan(plan.id)} className="text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!editing} onOpenChange={open => !open && setEditing(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Editar Plano: {editing?.name}</DialogTitle></DialogHeader>
            {renderForm(saveEdit)}
          </DialogContent>
        </Dialog>

        <Dialog open={creating} onOpenChange={setCreating}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Plano</DialogTitle></DialogHeader>
            {renderForm(saveCreate)}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
