import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ImageUpload, MultiImageUpload } from '@/components/ImageUpload';
import { Plus, Pencil, Trash2, FileText } from 'lucide-react';
import { categories } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

interface LocalClassified {
  id: string; title: string; description: string; price: string; category: string; city: string; status: 'active' | 'paused';
  coverUrl: string; gallery: string[];
}

export default function DashboardClassificados() {
  const [items, setItems] = useState<LocalClassified[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', city: '', coverUrl: '', gallery: [] as string[] });
  const { toast } = useToast();

  const handleCreate = () => {
    if (!form.title || !form.category) return;
    setItems(prev => [...prev, { ...form, id: `cl-${Date.now()}`, status: 'active' }]);
    setForm({ title: '', description: '', price: '', category: '', city: '', coverUrl: '', gallery: [] });
    setOpen(false);
    toast({ title: 'Classificado criado!' });
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast({ title: 'Classificado excluído.' });
  };

  const toggleStatus = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: i.status === 'active' ? 'paused' : 'active' } : i));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Meus Classificados</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="font-semibold"><Plus className="mr-2 h-4 w-4" /> Novo Classificado</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader><DialogTitle>Novo Classificado</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Título</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
                <div><Label>Descrição</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Preço (R$)</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
                  <div>
                    <Label>Categoria</Label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Selecione</option>
                      {categories.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div><Label>Cidade</Label><Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} /></div>

                <div>
                  <Label className="mb-2 block">Foto de Capa</Label>
                  <ImageUpload
                    value={form.coverUrl}
                    onChange={url => setForm(f => ({ ...f, coverUrl: url }))}
                    onRemove={() => setForm(f => ({ ...f, coverUrl: '' }))}
                    label="Upload da foto de capa"
                    aspectRatio="wide"
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Galeria de Fotos</Label>
                  <MultiImageUpload
                    values={form.gallery}
                    onChange={urls => setForm(f => ({ ...f, gallery: urls }))}
                    max={8}
                    label="Adicionar"
                  />
                </div>

                <Button className="w-full font-bold" onClick={handleCreate}>Publicar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted"><FileText className="h-8 w-8 text-muted-foreground" /></div>
              <p className="mt-2 text-muted-foreground">Você ainda não tem classificados.</p>
              <Button variant="outline" className="mt-4" onClick={() => setOpen(true)}>Criar primeiro classificado</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <Card key={item.id} className="card-hover">
                <CardContent className="flex items-center gap-4 p-4">
                  {item.coverUrl && (
                    <img src={item.coverUrl} alt={item.title} className="h-16 w-24 rounded-md object-cover" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.category} • {item.city} {item.price && `• R$ ${item.price}`}</p>
                    {item.gallery.length > 0 && <p className="text-xs text-muted-foreground">{item.gallery.length} foto(s) na galeria</p>}
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${item.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                    {item.status === 'active' ? 'Ativo' : 'Pausado'}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => toggleStatus(item.id)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
