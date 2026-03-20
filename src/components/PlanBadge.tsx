import type { PlanTier } from '@/lib/mock-data';

const config: Record<PlanTier, { label: string; className: string }> = {
  premium: { label: '🥇 PREMIUM', className: 'badge-premium' },
  pro: { label: '🥈 PRO', className: 'badge-pro' },
  smart: { label: '🆓 SMART', className: 'border border-border bg-muted text-muted-foreground' },
};

export function PlanBadge({ plan, size = 'sm' }: { plan: PlanTier; size?: 'sm' | 'md' }) {
  const c = config[plan];
  return (
    <span className={`inline-flex items-center rounded-full font-bold ${c.className} ${size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'}`}>
      {c.label}
    </span>
  );
}
