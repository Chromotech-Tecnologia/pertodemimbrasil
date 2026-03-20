import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { blogPosts } from '@/lib/mock-data';
import { ArrowLeft, Clock } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Artigo não encontrado.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Blog
          </Link>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{post.category}</span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-balance">{post.title}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime} de leitura</span>
          </div>
          <img src={post.imageUrl} alt={post.title} className="mt-8 w-full rounded-xl" />
          <div className="prose prose-sm mt-8 max-w-none text-muted-foreground leading-relaxed">
            <p>{post.excerpt}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h2 className="text-lg font-bold text-foreground mt-6 mb-3">Por que isso é importante?</h2>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <h2 className="text-lg font-bold text-foreground mt-6 mb-3">Conclusão</h2>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          </div>
        </div>
      </article>
    </Layout>
  );
}
