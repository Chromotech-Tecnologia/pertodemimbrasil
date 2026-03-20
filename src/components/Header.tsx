import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Empresas', path: '/empresas' },
  { label: 'Classificados', path: '/classificados' },
  { label: 'Planos', path: '/planos' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Contato', path: '/contato' },
  { label: 'Blog', path: '/blog' },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={theme === 'dark' ? '/logo-colorida.png' : '/logo-preta.png'}
            alt="Perto de Mim"
            className="h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground ${
                location.pathname === link.path
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Link to="/cadastro" className="hidden sm:block">
            <Button size="sm" className="font-semibold">
              Anuncie Grátis
            </Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="rounded-md p-2 text-muted-foreground hover:bg-accent/50">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-accent/50 ${
                      location.pathname === link.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/cadastro" onClick={() => setOpen(false)} className="mt-4">
                  <Button className="w-full font-semibold">Anuncie Grátis</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
