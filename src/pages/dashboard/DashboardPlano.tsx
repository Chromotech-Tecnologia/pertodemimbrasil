import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlanBadge } from '@/components/PlanBadge';
import { planFeatures, type PlanTier } from '@/lib/mock-data';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const planInfo: Record<PlanTier, { price: number; name: string }> = {
  smart: { price: 0, name: 'Smart' },
  pro: { price: 89, name: 'Pro' },
  premium: { price: 169, name: 'Premium' },
};

export default function DashboardPlano() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const currentPlan = user?.plan || 'smart';

  const handleUpgrade = (plan: PlanTier) => {
    updateUser({ plan, planStatus: 'active' });
    toast({ title: `Plano atualizado para ${planInfo[plan].name}!` });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold">Plano & Faturamento</h1>

        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Seu plano atual</p>
              <div className="mt-1 flex items-center gap-3">
                <PlanBadge plan={currentPlan} />
                <span className="text-xl font-extrabold">{planInfo[currentPlan].name}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {currentPlan === 'smart' ? 'Plano gratuito' : `R$ ${planInfo[currentPlan].price},00/mês`}
              </p>
            </div>
            {user?.planStatus === 'trial' && (
              <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
                Trial até {user.trialEndsAt}
              </span>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {(['smart', 'pro', 'premium'] as PlanTier[]).map(plan => (
            <Card key={plan} className={`${plan === currentPlan ? 'border-primary shadow-md' : 'border-border/50'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <PlanBadge plan={plan} size="sm" />
                  <CardTitle className="text-lg">{planInfo[plan].name}</CardTitle>
                </div>
                <p className="text-2xl font-extrabold">
                  {plan === 'smart' ? 'Grátis' : `R$ ${planInfo[plan].price}`}
                  {plan !== 'smart' && <span className="text-sm font-normal text-muted-foreground">/mês</span>}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                {planFeatures.map((f, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs ${f[plan] ? '' : 'text-muted-foreground/40'}`}>
                    {f[plan] ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3" />}
                    <span>{f.name}</span>
                  </div>
                ))}
                <Button
                  className="mt-4 w-full font-bold"
                  variant={plan === currentPlan ? 'outline' : 'default'}
                  disabled={plan === currentPlan}
                  onClick={() => handleUpgrade(plan)}
                >
                  {plan === currentPlan ? 'Plano Atual' : 'Selecionar'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
