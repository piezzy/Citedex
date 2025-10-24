import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-transparent dark:from-blue-950/20 dark:via-teal-950/20 dark:to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-200 dark:bg-teal-900/20 rounded-full blur-3xl opacity-20" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-teal-500 text-white border-0">
            <Sparkles className="w-4 h-4 mr-1" />
            Powered by Advanced AI
          </Badge>
          
          <h1 className="mb-6 text-5xl md:text-7xl bg-gradient-to-r from-blue-700 via-teal-600 to-blue-600 dark:from-blue-400 dark:via-teal-400 dark:to-blue-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
            Instant DOI Registration for Everyone
          </h1>
          
          <p className="mb-10 text-xl text-muted-foreground max-w-2xl mx-auto">
            Register DOIs for your research in minutes, not months. AI-powered metadata extraction, 
            no complex memberships, and instant validation for individual researchers and small institutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white border-0 px-8 py-6"
            >
              Get Free DOI
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 border-2"
            >
              Try AI Extraction
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>5-Minute Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>10,000+ Researchers Trust Us</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
