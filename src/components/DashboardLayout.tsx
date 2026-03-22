import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { PlanBadge } from '@/components/PlanBadge';
import {
  LayoutDashboard, Building2, BarChart3, FileText, MessageSquare,
  Palette, CreditCard, Settings, LogOut, Menu, X, Sun, Moon, ChevronLeft
} from 'lucide-react';

const menuItems = [
  { label: 'Visão Geral', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Minha Empresa', icon: Building2, path: '/dashboard/empresa' },
  { label: 'Estatísticas', icon: BarChart3, path: '/dashboard/estatisticas' },
  { label: 'Classificados', icon: FileText, path: '/dashboard/classificados' },
  { label: 'Mensagens', icon: MessageSquare, path: '/dashboard/mensagens' },
  { label: 'Landing Page', icon: Palette, path: '/dashboard/landing-page', premiumOnly: true },
  { label: 'Plano & Faturamento', icon: CreditCard, path: '/dashboard/plano' },
  { label: 'Configurações', icon: Settings, path: '/dashboard/configuracoes' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/50 bg-card transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={theme === 'dark' ? '/logo-colorida.png' : '/logo-preta.png'} alt="Perto de Mim" className="h-7" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map(item => {
            const active = location.pathname === item.path;
            const locked = item.premiumOnly && user?.plan !== 'premium';
            return (
              <Link
                key={item.path}
                to={locked ? '/dashboard/plano' : item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent/30 hover:text-foreground'} ${locked ? 'opacity-50' : ''}`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
                {locked && <span className="ml-auto text-[10px] font-bold text-warning">PRO</span>}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/50 p-3">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border/50 bg-card/50 px-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground"><Menu className="h-5 w-5" /></button>
            <Link to="/" className="text-muted-foreground hover:text-foreground"><ChevronLeft className="h-4 w-4" /></Link>
          </div>
          <div className="flex items-center gap-3">
            <PlanBadge plan={user?.plan || 'smart'} size="sm" />
            <button onClick={toggle} className="rounded-full p-2 text-muted-foreground hover:bg-accent/30">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="hidden text-sm font-medium sm:block">{user?.name}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
