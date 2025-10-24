import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";

export function DemoSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Upload", icon: Upload },
    { label: "AI Extract", icon: Sparkles },
    { label: "Validate", icon: CheckCircle2 },
    { label: "Register", icon: FileText }
  ];

  const extractedMetadata = {
    title: "Neural Networks in Climate Prediction: A Comprehensive Study",
    authors: ["Dr. Sarah Chen", "Prof. Michael Kumar", "Dr. Elena Rodriguez"],
    abstract: "This paper presents a novel approach to climate prediction using deep neural networks...",
    keywords: ["Machine Learning", "Climate Science", "Neural Networks"],
    publicationDate: "2024-10-15",
    publisher: "International Journal of Climate Research"
  };

  return (
    <section id="demo" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl md:text-5xl" style={{ fontWeight: 700 }}>
            See How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of AI-driven metadata extraction. Upload your research and watch the magic happen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Upload Interface */}
          <Card className="p-8 border-2">
            <Tabs defaultValue="pdf" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="pdf">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload PDF
                </TabsTrigger>
                <TabsTrigger value="url">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Enter URL
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="pdf" className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-muted/30">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="mb-2" style={{ fontWeight: 600 }}>Drop your PDF here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                  onClick={() => setActiveStep(1)}
                >
                  Extract Metadata with AI
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm">Research Paper URL</label>
                  <input 
                    type="url"
                    placeholder="https://example.com/your-paper.pdf"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                  onClick={() => setActiveStep(1)}
                >
                  Extract Metadata with AI
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </TabsContent>
            </Tabs>

            {/* Process Steps */}
            <div className="mt-8 flex justify-between items-center">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= activeStep;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-center">{step.label}</span>
                    {index < steps.length - 1 && (
                      <div className="absolute w-full h-0.5 bg-muted top-5 left-1/2 -z-10" style={{ width: 'calc(100% / 4)' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* AI Extraction Result */}
          <Card className="p-8 border-2 bg-gradient-to-br from-blue-50/50 to-teal-50/50 dark:from-blue-950/20 dark:to-teal-950/20">
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontWeight: 600 }}>Extracted Metadata</h3>
              <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                99.5% Accurate
              </Badge>
            </div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <label className="text-sm text-muted-foreground">Title</label>
                <p className="mt-1 p-3 bg-background rounded-lg border border-border">
                  {extractedMetadata.title}
                </p>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Authors</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {extractedMetadata.authors.map((author, index) => (
                    <Badge key={index} variant="secondary">
                      {author}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Abstract</label>
                <p className="mt-1 p-3 bg-background rounded-lg border border-border text-sm">
                  {extractedMetadata.abstract}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Publication Date</label>
                  <p className="mt-1 p-3 bg-background rounded-lg border border-border text-sm">
                    {extractedMetadata.publicationDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Publisher</label>
                  <p className="mt-1 p-3 bg-background rounded-lg border border-border text-sm truncate">
                    {extractedMetadata.publisher}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Keywords</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {extractedMetadata.keywords.map((keyword, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-4" variant="outline">
                Edit & Register DOI
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </Card>
        </div>
      </div>
    </section>
  );
}
