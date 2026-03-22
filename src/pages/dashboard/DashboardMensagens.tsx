import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MailOpen, Archive } from 'lucide-react';

const mockMessages = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 98888-1111', message: 'Gostaria de saber mais sobre os serviços oferecidos.', date: '2024-03-15', read: false },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(21) 97777-2222', message: 'Qual o horário de funcionamento de vocês?', date: '2024-03-14', read: false },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro@email.com', phone: '(31) 96666-3333', message: 'Vocês fazem orçamento online? Preciso de um serviço urgente.', date: '2024-03-13', read: true },
];

export default function DashboardMensagens() {
  const [messages, setMessages] = useState(mockMessages);

  const toggleRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: !m.read } : m));
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Mensagens</h1>
            <p className="text-sm text-muted-foreground">{unreadCount} não lida(s)</p>
          </div>
        </div>

        <div className="space-y-3">
          {messages.map(m => (
            <Card key={m.id} className={`card-hover ${!m.read ? 'border-primary/30 bg-primary/5' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${!m.read ? 'bg-primary/10' : 'bg-muted'}`}>
                    {!m.read ? <Mail className="h-4 w-4 text-primary" /> : <MailOpen className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{m.name}</span>
                      {!m.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{m.email} • {m.phone}</p>
                    <p className="mt-1 text-sm">{m.message}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{m.date}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toggleRead(m.id)}>
                    {m.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
