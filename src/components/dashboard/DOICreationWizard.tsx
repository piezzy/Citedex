import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  AlertCircle,
  Copy,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DOICreationWizardProps {
  onNavigate: (view: string) => void;
}

export function DOICreationWizard({ onNavigate }: DOICreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputMethod, setInputMethod] = useState<"manual" | "url" | "pdf">("pdf");
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);
  const [generatedDOI, setGeneratedDOI] = useState("");

  const steps = [
    { number: 1, title: "Input Method", icon: Upload },
    { number: 2, title: "AI Extraction", icon: Sparkles },
    { number: 3, title: "Review & Edit", icon: FileText },
    { number: 4, title: "Confirmation", icon: CheckCircle2 }
  ];

  const [metadata, setMetadata] = useState({
    title: "Neural Networks in Climate Prediction: A Comprehensive Study",
    authors: "Dr. Sarah Chen, Prof. Michael Kumar, Dr. Elena Rodriguez",
    abstract: "This paper presents a novel approach to climate prediction using deep neural networks. Our methodology combines traditional climate models with advanced machine learning techniques to improve forecast accuracy by 23%. We analyze 50 years of historical climate data and validate our approach across multiple geographic regions.",
    keywords: "Machine Learning, Climate Science, Neural Networks, Weather Forecasting",
    publicationDate: "2024-10-20",
    publisher: "International Journal of Climate Research",
    pages: "1-24",
    volume: "42",
    issue: "3"
  });

  const fieldConfidence = {
    title: 99.5,
    authors: 98.2,
    abstract: 97.8,
    keywords: 96.5,
    publicationDate: 99.8,
    publisher: 95.2,
    pages: 98.9,
    volume: 99.1,
    issue: 99.3
  };

  const handleExtraction = () => {
    setIsExtracting(true);
    setExtractionProgress(0);
    
    const interval = setInterval(() => {
      setExtractionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExtracting(false);
          setTimeout(() => setCurrentStep(3), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleSubmit = () => {
    setGeneratedDOI("10.1234/research.2024.006");
    setCurrentStep(4);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 99) return "text-green-600 dark:text-green-400";
    if (confidence >= 95) return "text-blue-600 dark:text-blue-400";
    return "text-yellow-600 dark:text-yellow-400";
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>Create New DOI</h1>
        <p className="text-muted-foreground">Follow the steps to register your research with a DOI</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10" />
          <div 
            className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 -z-10 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            
            return (
              <div key={step.number} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' 
                      : isCurrent
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white ring-4 ring-blue-200 dark:ring-blue-900'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-sm ${isCurrent ? '' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8">
              <h2 className="text-xl mb-6" style={{ fontWeight: 600 }}>Choose Input Method</h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <button
                  onClick={() => setInputMethod("pdf")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    inputMethod === "pdf"
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                      : 'border-border hover:border-blue-300'
                  }`}
                >
                  <Upload className={`w-8 h-8 mx-auto mb-3 ${
                    inputMethod === "pdf" ? 'text-blue-600' : 'text-muted-foreground'
                  }`} />
                  <p style={{ fontWeight: 600 }}>Upload PDF</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload your research paper
                  </p>
                </button>

                <button
                  onClick={() => setInputMethod("url")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    inputMethod === "url"
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                      : 'border-border hover:border-blue-300'
                  }`}
                >
                  <LinkIcon className={`w-8 h-8 mx-auto mb-3 ${
                    inputMethod === "url" ? 'text-blue-600' : 'text-muted-foreground'
                  }`} />
                  <p style={{ fontWeight: 600 }}>Enter URL</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Paste a paper URL
                  </p>
                </button>

                <button
                  onClick={() => setInputMethod("manual")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    inputMethod === "manual"
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                      : 'border-border hover:border-blue-300'
                  }`}
                >
                  <FileText className={`w-8 h-8 mx-auto mb-3 ${
                    inputMethod === "manual" ? 'text-blue-600' : 'text-muted-foreground'
                  }`} />
                  <p style={{ fontWeight: 600 }}>Manual Entry</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter details manually
                  </p>
                </button>
              </div>

              {inputMethod === "pdf" && (
                <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-muted/30">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="mb-2" style={{ fontWeight: 600 }}>Drop your PDF here</p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                  <Button variant="outline">Select File</Button>
                </div>
              )}

              {inputMethod === "url" && (
                <div className="space-y-2">
                  <Label>Research Paper URL</Label>
                  <Input 
                    type="url"
                    placeholder="https://example.com/your-paper.pdf"
                  />
                </div>
              )}

              {inputMethod === "manual" && (
                <div className="text-center text-muted-foreground">
                  Manual entry will skip AI extraction and take you directly to the form.
                </div>
              )}

              <div className="flex justify-end mt-8">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                  onClick={() => inputMethod === "manual" ? setCurrentStep(3) : setCurrentStep(2)}
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl mb-2" style={{ fontWeight: 600 }}>
                  {isExtracting ? "Extracting Metadata..." : "Ready to Extract"}
                </h2>
                <p className="text-muted-foreground">
                  {isExtracting 
                    ? "Our AI is analyzing your document and extracting metadata" 
                    : "Click the button below to start AI-powered metadata extraction"}
                </p>
              </div>

              {isExtracting && (
                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Extraction Progress</span>
                      <span className="text-sm" style={{ fontWeight: 600 }}>{extractionProgress}%</span>
                    </div>
                    <Progress value={extractionProgress} className="h-2" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Analyzing structure", progress: extractionProgress > 20 },
                      { label: "Extracting title & authors", progress: extractionProgress > 40 },
                      { label: "Processing abstract", progress: extractionProgress > 60 },
                      { label: "Identifying keywords", progress: extractionProgress > 80 }
                    ].map((task, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        {task.progress ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted-foreground rounded-full animate-spin border-t-transparent" />
                        )}
                        <span className="text-sm">{task.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isExtracting && extractionProgress === 0 && (
                <div className="flex justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                    onClick={handleExtraction}
                  >
                    <Sparkles className="mr-2 w-5 h-5" />
                    Start AI Extraction
                  </Button>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  disabled={isExtracting}
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl" style={{ fontWeight: 600 }}>Review & Edit Metadata</h2>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Extraction Complete
                </Badge>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Title *</Label>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${getConfidenceColor(fieldConfidence.title)}`}>
                        {fieldConfidence.title}% confidence
                      </span>
                      {fieldConfidence.title >= 99 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      {fieldConfidence.title < 95 && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </div>
                  <Input 
                    value={metadata.title}
                    onChange={(e) => setMetadata({...metadata, title: e.target.value})}
                  />
                </div>

                {/* Authors */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Authors *</Label>
                    <span className={`text-xs ${getConfidenceColor(fieldConfidence.authors)}`}>
                      {fieldConfidence.authors}% confidence
                    </span>
                  </div>
                  <Input 
                    value={metadata.authors}
                    onChange={(e) => setMetadata({...metadata, authors: e.target.value})}
                  />
                </div>

                {/* Abstract */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Abstract *</Label>
                    <span className={`text-xs ${getConfidenceColor(fieldConfidence.abstract)}`}>
                      {fieldConfidence.abstract}% confidence
                    </span>
                  </div>
                  <Textarea 
                    value={metadata.abstract}
                    onChange={(e) => setMetadata({...metadata, abstract: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Keywords */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Keywords</Label>
                      <span className={`text-xs ${getConfidenceColor(fieldConfidence.keywords)}`}>
                        {fieldConfidence.keywords}% confidence
                      </span>
                    </div>
                    <Input 
                      value={metadata.keywords}
                      onChange={(e) => setMetadata({...metadata, keywords: e.target.value})}
                    />
                  </div>

                  {/* Publication Date */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Publication Date *</Label>
                      <span className={`text-xs ${getConfidenceColor(fieldConfidence.publicationDate)}`}>
                        {fieldConfidence.publicationDate}% confidence
                      </span>
                    </div>
                    <Input 
                      type="date"
                      value={metadata.publicationDate}
                      onChange={(e) => setMetadata({...metadata, publicationDate: e.target.value})}
                    />
                  </div>

                  {/* Publisher */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Publisher</Label>
                      <span className={`text-xs ${getConfidenceColor(fieldConfidence.publisher)}`}>
                        {fieldConfidence.publisher}% confidence
                      </span>
                    </div>
                    <Input 
                      value={metadata.publisher}
                      onChange={(e) => setMetadata({...metadata, publisher: e.target.value})}
                    />
                  </div>

                  {/* Pages */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Pages</Label>
                      <span className={`text-xs ${getConfidenceColor(fieldConfidence.pages)}`}>
                        {fieldConfidence.pages}% confidence
                      </span>
                    </div>
                    <Input 
                      value={metadata.pages}
                      onChange={(e) => setMetadata({...metadata, pages: e.target.value})}
                    />
                  </div>

                  {/* Volume */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Volume</Label>
                      <span className={`text-xs ${getConfidenceColor(fieldConfidence.volume)}`}>
                        {fieldConfidence.volume}% confidence
                      </span>
                    </div>
                    <Input 
                      value={metadata.volume}
                      onChange={(e) => setMetadata({...metadata, volume: e.target.value})}
                    />
                  </div>

                  {/* Issue */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Issue</Label>
                      <span className={`text-xs ${getConfidenceColor(fieldConfidence.issue)}`}>
                        {fieldConfidence.issue}% confidence
                      </span>
                    </div>
                    <Input 
                      value={metadata.issue}
                      onChange={(e) => setMetadata({...metadata, issue: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                  onClick={handleSubmit}
                >
                  Register DOI
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl mb-3" style={{ fontWeight: 700 }}>DOI Successfully Registered!</h2>
              <p className="text-muted-foreground mb-8">
                Your research has been assigned a DOI and is now available worldwide.
              </p>

              <div className="bg-muted rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                <p className="text-sm text-muted-foreground mb-2">Your DOI</p>
                <div className="flex items-center justify-center gap-3">
                  <p className="text-2xl" style={{ fontWeight: 700 }}>{generatedDOI}</p>
                  <Button variant="ghost" size="icon">
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  https://doi.org/{generatedDOI}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                    Active
                  </Badge>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">AI Confidence</p>
                  <p style={{ fontWeight: 600 }}>98.3%</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Registered</p>
                  <p style={{ fontWeight: 600 }}>Just now</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate("my-dois")}
                >
                  View My DOIs
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                  onClick={() => {
                    setCurrentStep(1);
                    setExtractionProgress(0);
                    setGeneratedDOI("");
                  }}
                >
                  Create Another DOI
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
