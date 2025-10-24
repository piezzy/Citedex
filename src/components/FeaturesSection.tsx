import { Card } from "./ui/card";
import { 
  Zap, 
  Brain, 
  BarChart3, 
  Shield, 
  Globe, 
  Clock 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "One-Click Registration",
    description: "Register your DOIs instantly without complex workflows. Our streamlined process takes minutes, not months.",
    gradient: "from-blue-600 to-blue-400"
  },
  {
    icon: Brain,
    title: "AI Metadata Extraction",
    description: "Upload your PDF or paste a URL. Our AI automatically extracts and validates metadata with 99.5% accuracy.",
    gradient: "from-teal-600 to-teal-400"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track citations, downloads, and engagement metrics. Understand your research impact with comprehensive dashboards.",
    gradient: "from-blue-500 to-teal-500"
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Enterprise-grade security with full compliance to CrossRef and DataCite standards. Your data is always protected.",
    gradient: "from-blue-700 to-blue-500"
  },
  {
    icon: Globe,
    title: "Global Recognition",
    description: "Your DOIs are recognized worldwide across all major academic databases and citation indexes.",
    gradient: "from-teal-700 to-teal-500"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Get help anytime with our dedicated support team and comprehensive documentation for all your questions.",
    gradient: "from-blue-600 to-teal-600"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl md:text-5xl" style={{ fontWeight: 700 }}>
            Everything You Need to Publish
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed specifically for researchers and institutions who value simplicity and speed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-2"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2" style={{ fontWeight: 600 }}>{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
