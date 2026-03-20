export const categories = [
  { name: 'Automotivo', icon: '🚗', slug: 'automotivo' },
  { name: 'Beleza', icon: '💄', slug: 'beleza' },
  { name: 'Assistência Técnica', icon: '🔧', slug: 'assistencia-tecnica' },
  { name: 'Comércio', icon: '🏪', slug: 'comercio' },
  { name: 'Alimentação', icon: '🍕', slug: 'alimentacao' },
  { name: 'Tecnologia', icon: '📱', slug: 'tecnologia' },
  { name: 'Imóveis', icon: '🏠', slug: 'imoveis' },
  { name: 'Educação', icon: '🎓', slug: 'educacao' },
  { name: 'Fitness', icon: '🏋️', slug: 'fitness' },
  { name: 'Jurídico', icon: '⚖️', slug: 'juridico' },
  { name: 'Saúde', icon: '🩺', slug: 'saude' },
  { name: 'Marketing', icon: '🎨', slug: 'marketing' },
];

export type PlanTier = 'premium' | 'pro' | 'smart';

export interface Company {
  id: string;
  slug: string;
  name: string;
  category: string;
  city: string;
  state: string;
  shortDescription: string;
  fullDescription: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  plan: PlanTier;
  rating: number;
  reviewCount: number;
  logoUrl: string;
  coverUrl: string;
  gallery: string[];
  address: string;
  workingHours: Record<string, string>;
  socials: { facebook?: string; instagram?: string };
  services: string[];
}

const makeCompany = (i: number, plan: PlanTier): Company => {
  const names = [
    'Studio Bella Arte', 'TechFix Solutions', 'Sabor & Cia Restaurante',
    'AutoPrime Oficina', 'Clínica Vida Plena', 'Imóveis Premium Sul',
    'Academia Iron Fit', 'Advocacia Fernandes', 'Digital Marketing Pro',
    'Pet Shop Animal Feliz', 'Padaria Pão Dourado', 'Escola Futuro Brilhante',
    'Barbearia Old School', 'Floricultura Jardim Real', 'Construtora Horizonte',
    'Ótica Visão Clara', 'Farmácia Saúde Total', 'Elétrica Raio',
  ];
  const cats = ['Beleza', 'Tecnologia', 'Alimentação', 'Automotivo', 'Saúde', 'Imóveis', 'Fitness', 'Jurídico', 'Marketing', 'Comércio', 'Alimentação', 'Educação', 'Beleza', 'Comércio', 'Imóveis', 'Saúde', 'Saúde', 'Assistência Técnica'];
  const cities = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Porto Alegre, RS', 'Brasília, DF', 'Salvador, BA', 'Fortaleza, CE', 'Recife, PE'];
  const idx = i % names.length;
  return {
    id: `company-${i}`,
    slug: names[idx].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: names[idx],
    category: cats[idx],
    city: cities[i % cities.length].split(',')[0],
    state: cities[i % cities.length].split(', ')[1],
    shortDescription: `Somos referência em ${cats[idx].toLowerCase()} na região. Atendimento personalizado e qualidade garantida.`,
    fullDescription: `Com mais de 10 anos de experiência, a ${names[idx]} é líder no segmento de ${cats[idx].toLowerCase()}. Nossa equipe altamente qualificada está pronta para atender você com excelência e dedicação. Venha nos visitar!`,
    phone: '(11) 9' + String(Math.floor(Math.random() * 90000000 + 10000000)),
    whatsapp: '5511' + String(Math.floor(Math.random() * 900000000 + 100000000)),
    email: `contato@${names[idx].toLowerCase().replace(/[^a-z]+/g, '')}.com.br`,
    website: `https://${names[idx].toLowerCase().replace(/[^a-z]+/g, '')}.com.br`,
    plan,
    rating: +(3.5 + Math.random() * 1.5).toFixed(1),
    reviewCount: Math.floor(Math.random() * 200 + 10),
    logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(names[idx])}&background=6B6FD4&color=fff&size=128&bold=true`,
    coverUrl: `https://images.unsplash.com/photo-${1500000000000 + i * 3721}?w=800&h=400&fit=crop`,
    gallery: [],
    address: `Rua das Flores, ${100 + i * 13}, Centro`,
    workingHours: { 'Seg-Sex': '08:00 - 18:00', 'Sáb': '08:00 - 12:00', 'Dom': 'Fechado' },
    socials: { instagram: '#', facebook: '#' },
    services: ['Consultoria', 'Atendimento', 'Orçamento grátis', 'Delivery'],
  };
};

export const mockCompanies: Company[] = [
  ...Array.from({ length: 6 }, (_, i) => makeCompany(i, 'premium')),
  ...Array.from({ length: 6 }, (_, i) => makeCompany(i + 6, 'pro')),
  ...Array.from({ length: 6 }, (_, i) => makeCompany(i + 12, 'smart')),
];

export interface Classified {
  id: string;
  title: string;
  description: string;
  price: number | null;
  category: string;
  city: string;
  imageUrl: string;
  whatsapp: string;
  isFeatured: boolean;
  createdAt: string;
  views: number;
}

export const mockClassifieds: Classified[] = [
  { id: 'c1', title: 'iPhone 14 Pro 128GB', description: 'Seminovo, excelente estado, com caixa e acessórios.', price: 4200, category: 'Tecnologia', city: 'São Paulo', imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop', whatsapp: '5511999999999', isFeatured: true, createdAt: '2024-03-15', views: 342 },
  { id: 'c2', title: 'Sofá 3 Lugares Retrátil', description: 'Tecido suede, cor cinza, pouco uso.', price: 1800, category: 'Comércio', city: 'Rio de Janeiro', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop', whatsapp: '5521999999999', isFeatured: true, createdAt: '2024-03-14', views: 189 },
  { id: 'c3', title: 'Aulas de Inglês Particular', description: 'Professor nativo, online ou presencial.', price: 80, category: 'Educação', city: 'Belo Horizonte', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop', whatsapp: '5531999999999', isFeatured: false, createdAt: '2024-03-13', views: 95 },
  { id: 'c4', title: 'Honda Civic 2020 Touring', description: 'Único dono, revisado na concessionária, 45.000km.', price: 125000, category: 'Automotivo', city: 'Curitiba', imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop', whatsapp: '5541999999999', isFeatured: true, createdAt: '2024-03-12', views: 567 },
  { id: 'c5', title: 'Kit Maquiagem Profissional', description: 'Paletas, pincéis e necessaire. Marcas importadas.', price: 350, category: 'Beleza', city: 'Salvador', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop', whatsapp: '5571999999999', isFeatured: false, createdAt: '2024-03-11', views: 78 },
  { id: 'c6', title: 'Apartamento 2 Quartos - Aluguel', description: 'Centro, 65m², condomínio incluso, vaga de garagem.', price: 2200, category: 'Imóveis', city: 'Porto Alegre', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop', whatsapp: '5551999999999', isFeatured: true, createdAt: '2024-03-10', views: 445 },
  { id: 'c7', title: 'Notebook Dell Inspiron i7', description: '16GB RAM, SSD 512GB, tela 15.6". Com NF.', price: 3500, category: 'Tecnologia', city: 'Brasília', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop', whatsapp: '5561999999999', isFeatured: false, createdAt: '2024-03-09', views: 213 },
  { id: 'c8', title: 'Bicicleta Speed Caloi Strada', description: 'Quadro alumínio, Shimano Claris, tamanho 54.', price: 2800, category: 'Fitness', city: 'Fortaleza', imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop', whatsapp: '5585999999999', isFeatured: false, createdAt: '2024-03-08', views: 134 },
];

export const testimonials = [
  { name: 'Mariana Costa', company: 'Studio Bella Arte', text: 'Desde que cadastrei minha empresa no Perto de Mim, o número de clientes pelo WhatsApp triplicou! A plataforma é muito fácil de usar.', rating: 5, avatar: 'MC' },
  { name: 'Carlos Eduardo', company: 'TechFix Solutions', text: 'O plano Premium com a landing page fez toda a diferença. Meus clientes agora encontram tudo sobre meu negócio em um só lugar.', rating: 5, avatar: 'CE' },
  { name: 'Ana Beatriz', company: 'Sabor & Cia', text: 'Excelente custo-benefício! O plano Pro já me deu resultados incríveis. Recomendo para todos os empreendedores.', rating: 4, avatar: 'AB' },
  { name: 'Roberto Silva', company: 'AutoPrime Oficina', text: 'O sistema de classificados me ajudou a vender peças e serviços extras. Uma ferramenta completa para negócios locais.', rating: 5, avatar: 'RS' },
];

export const blogPosts = [
  { id: '1', slug: 'como-atrair-clientes-locais', title: 'Como Atrair Mais Clientes Locais Para Seu Negócio', excerpt: 'Descubra estratégias comprovadas para aumentar a visibilidade da sua empresa na sua região.', category: 'Marketing', date: '2024-03-15', readTime: '5 min', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { id: '2', slug: 'importancia-presenca-digital', title: 'A Importância da Presença Digital em 2024', excerpt: 'Entenda por que ter uma presença online forte é essencial para o sucesso do seu negócio local.', category: 'Digital', date: '2024-03-10', readTime: '4 min', imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop' },
  { id: '3', slug: 'dicas-whatsapp-business', title: '7 Dicas Para Usar o WhatsApp Business a Seu Favor', excerpt: 'Aprenda a utilizar o WhatsApp Business como ferramenta de vendas e atendimento ao cliente.', category: 'Ferramentas', date: '2024-03-05', readTime: '6 min', imageUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop' },
  { id: '4', slug: 'google-meu-negocio-guia', title: 'Guia Completo: Google Meu Negócio Para Iniciantes', excerpt: 'Passo a passo para configurar e otimizar o perfil da sua empresa no Google.', category: 'SEO', date: '2024-02-28', readTime: '8 min', imageUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop' },
];

export const planFeatures = [
  { name: 'Divulgar telefone, email, página da empresa, endereço', smart: true, pro: true, premium: true },
  { name: 'Receber mensagens ilimitadas no WhatsApp', smart: true, pro: true, premium: true },
  { name: 'Divulgação em nossas redes sociais', smart: false, pro: true, premium: true },
  { name: 'Serviço inteligente de Chatbot', smart: false, pro: true, premium: true },
  { name: 'Aparecer na página inicial', smart: false, pro: true, premium: true },
  { name: 'Aparecer no menu Destaque', smart: false, pro: false, premium: true },
  { name: 'Aparecer no menu categoria', smart: false, pro: true, premium: true },
  { name: 'Prioridade na pesquisa dentro do sistema', smart: false, pro: false, premium: true },
  { name: 'Palavras-chave inclusas nas campanhas de Google Ads', smart: false, pro: false, premium: true },
  { name: 'Categoria inclusa na campanha do Google Ads', smart: false, pro: false, premium: true },
  { name: '1 Landing Page espetacular dentro do site', smart: false, pro: false, premium: true },
];

export const faqItems = [
  { category: 'Geral', question: 'O que é o Perto de Mim?', answer: 'O Perto de Mim é uma plataforma que conecta clientes a empresas locais no Brasil. Funcionamos como um diretório completo onde você encontra produtos, serviços e classificados da sua região.' },
  { category: 'Geral', question: 'Como encontro empresas perto de mim?', answer: 'Basta acessar a página de empresas, usar a barra de pesquisa e filtrar por categoria e cidade. As empresas premium aparecem primeiro nos resultados.' },
  { category: 'Empresas', question: 'Como cadastro minha empresa?', answer: 'É simples e gratuito! Clique em "Anuncie Grátis", crie sua conta, preencha os dados da empresa e pronto. Você começa com o plano Smart sem custo algum.' },
  { category: 'Empresas', question: 'Posso editar meus dados depois do cadastro?', answer: 'Sim! Acesse seu dashboard a qualquer momento para atualizar informações, fotos, horários de funcionamento e muito mais.' },
  { category: 'Planos', question: 'Qual a diferença entre os planos?', answer: 'O plano Smart é gratuito e oferece funcionalidades básicas. O Pro (R$89/mês) inclui destaque nas buscas e chatbot. O Premium (R$169/mês) inclui tudo, mais uma landing page exclusiva e prioridade máxima.' },
  { category: 'Planos', question: 'Posso cancelar a qualquer momento?', answer: 'Sim! Não há fidelidade. Você pode fazer downgrade ou cancelar seu plano quando quiser pelo dashboard.' },
  { category: 'Pagamento', question: 'Quais formas de pagamento são aceitas?', answer: 'Aceitamos cartão de crédito, boleto bancário e PIX. O pagamento é processado de forma segura.' },
  { category: 'Pagamento', question: 'Existe período de teste?', answer: 'Sim! Oferecemos um período de teste gratuito para os planos Pro e Premium. Entre em contato conosco para ativar.' },
  { category: 'Técnico', question: 'Minha empresa não aparece nas buscas, o que fazer?', answer: 'Verifique se seu perfil está publicado (não em rascunho) e se todos os dados obrigatórios estão preenchidos. Empresas com planos superiores têm prioridade nos resultados.' },
  { category: 'Técnico', question: 'Como funciona a landing page Premium?', answer: 'Ao assinar o plano Premium, você pode escolher entre 3 modelos de landing page profissional. É possível personalizar textos, imagens e cores diretamente pelo dashboard.' },
];
