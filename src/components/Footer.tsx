import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Empresas', path: '/empresas' },
  { label: 'Classificados', path: '/classificados' },
  { label: 'Planos', path: '/planos' },
  { label: 'Sobre nós', path: '/sobre' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contato', path: '/contato' },
  { label: 'Blog', path: '/blog' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <img src="/logo-colorida.png" alt="Perto de Mim" className="mb-4 h-10" />
            <p className="text-sm text-muted-foreground text-pretty max-w-xs">
              Conectando clientes e empresas no Brasil. Encontre tudo que precisa, perto de você.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="https://facebook.com/pertodemimbrasil" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Facebook</a>
              <a href="https://instagram.com/pertodemimbrasil" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</a>
              <a href="https://twitter.com/pertodemimbr" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</a>
            </div>
            <div className="mt-6 text-xs text-muted-foreground space-y-1">
              <p>© 2024 Perto de Mim Brasil. Todos os direitos reservados.</p>
              <p>CNPJ: 00.000.000/0001-00</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
