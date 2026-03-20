import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { blogPosts } from '@/lib/mock-data';
import { Clock } from 'lucide-react';

export default function Blog() {
  return (
    <Layout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="mb-2 text-center text-3xl font-extrabold">Blog</h1>
          <p className="mb-10 text-center text-muted-foreground">Dicas e novidades para fazer seu negócio crescer</p>

          <div className="grid gap-6 sm:grid-cols-2">
            {blogPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card-hover overflow-hidden rounded-xl border border-border/50 bg-card">
                <img src={post.imageUrl} alt={post.title} className="h-48 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">{post.category}</span>
                  <h2 className="mt-2 font-bold leading-snug">{post.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
