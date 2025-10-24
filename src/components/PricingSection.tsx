import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Zap, Crown } from "lucide-react";

const pricingTiers = [
  {
    name: "Free",
    icon: Zap,
    price: "$0",
    period: "forever",
    description: "Perfect for individual researchers getting started",
    badge: null,
    features: [
      "5 DOI registrations per month",
      "AI metadata extraction",
      "Basic analytics dashboard",
      "Community support",
      "Standard validation",
      "CrossRef integration"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Premium",
    icon: Crown,
    price: "$29",
    period: "per month",
    description: "For serious researchers and small institutions",
    badge: "Most Popular",
    features: [
      "Unlimited DOI registrations",
      "Advanced AI extraction",
      "Real-time analytics & insights",
      "Priority 24/7 support",
      "Advanced validation tools",
      "CrossRef & DataCite integration",
      "Bulk upload (up to 100 papers)",
      "Custom branding",
      "API access",
      "Export reports"
    ],
    buttonText: "Start Premium Trial",
    buttonVariant: "default" as const,
    popular: true
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl md:text-5xl" style={{ fontWeight: 700 }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your research needs. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <Card 
                key={index}
                className={`p-8 relative ${
                  tier.popular 
                    ? 'border-2 border-blue-500 shadow-xl scale-105' 
                    : 'border-2'
                }`}
              >
                {tier.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-teal-500 text-white border-0">
                    {tier.badge}
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                    tier.popular 
                      ? 'bg-gradient-to-br from-blue-600 to-teal-500' 
                      : 'bg-muted'
                  }`}>
                    <Icon className={`w-8 h-8 ${tier.popular ? 'text-white' : 'text-foreground'}`} />
                  </div>
                  
                  <h3 className="mb-2 text-2xl" style={{ fontWeight: 700 }}>{tier.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl" style={{ fontWeight: 700 }}>{tier.price}</span>
                    <span className="text-muted-foreground">/{tier.period}</span>
                  </div>
                </div>

                <Button 
                  className={`w-full mb-6 ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white' 
                      : ''
                  }`}
                  variant={tier.buttonVariant}
                  size="lg"
                >
                  {tier.buttonText}
                </Button>

                <div className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need a custom enterprise solution? {" "}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" style={{ fontWeight: 600 }}>
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
