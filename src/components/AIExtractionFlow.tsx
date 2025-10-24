import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  Share2,
  Download,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  AlertTriangle,
  Eye,
  Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type FlowStep = "input" | "processing" | "results" | "success";

export function AIExtractionFlow() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("input");
  const [inputMethod, setInputMethod] = useState<"url" | "pdf" | "manual">("pdf");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const processingStages = [
    { label: "Uploading document", progress: 15 },
    { label: "Analyzing document structure", progress: 35 },
    { label: "Extracting title & authors", progress: 55 },
    { label: "Processing abstract", progress: 75 },
    { label: "Identifying keywords & metadata", progress: 95 },
    { label: "Finalizing extraction", progress: 100 }
  ];

  const extractedData = {
    title: {
      value: "Neural Networks in Climate Prediction: A Comprehensive Study",
      confidence: 99.5,
      status: "high",
      snippet: "Title from page 1, line 1"
    },
    authors: {
      value: "Dr. Sarah Chen, Prof. Michael Kumar, Dr. Elena Rodriguez",
      confidence: 98.2,
      status: "high",
      snippet: "Authors from page 1, lines 3-5"
    },
    abstract: {
      value: "This paper presents a novel approach to climate prediction using deep neural networks. Our methodology combines traditional climate models with advanced machine learning techniques to improve forecast accuracy by 23%.",
      confidence: 97.8,
      status: "high",
      snippet: "Abstract section, page 1"
    },
    keywords: {
      value: "Machine Learning, Climate Science, Neural Networks, Weather Forecasting",
      confidence: 92.5,
      status: "medium",
      snippet: "Keywords section, page 1"
    },
    publicationDate: {
      value: "2024-10-20",
      confidence: 99.8,
      status: "high",
      snippet: "Date from header"
    },
    publisher: {
      value: "International Journal of Climate Research",
      confidence: 89.2,
      status: "medium",
      snippet: "Publisher info from page 1"
    },
    volume: {
      value: "42",
      confidence: 95.5,
      status: "high",
      snippet: "Volume info from header"
    },
    issue: {
      value: "",
      confidence: 0,
      status: "empty",
      snippet: "Not found in document"
    },
    pages: {
      value: "1-24",
      confidence: 88.1,
      status: "medium",
      snippet: "Page range from document"
    },
    doi: {
      value: "",
      confidence: 0,
      status: "empty",
      snippet: "No existing DOI found"
    }
  };

  const [metadata, setMetadata] = useState(extractedData);
  const generatedDOI = "10.1234/research.2024.006";

  const startProcessing = () => {
    setCurrentStep("processing");
    setProcessingProgress(0);
    setProcessingStage(0);

    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep("results"), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const stageInterval = setInterval(() => {
      setProcessingStage(prev => {
        if (prev >= processingStages.length - 1) {
          clearInterval(stageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const getFieldColor = (status: string) => {
    switch (status) {
      case "high":
        return "border-green-500 bg-green-50 dark:bg-green-950/20";
      case "medium":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20";
      case "empty":
        return "border-red-500 bg-red-50 dark:bg-red-950/20";
      default:
        return "";
    }
  };

  const getConfidenceIcon = (status: string) => {
    switch (status) {
      case "high":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "medium":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "empty":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-600 dark:text-green-400";
    if (confidence >= 85) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
            AI Metadata Extraction Flow
          </h1>
          <p className="text-muted-foreground mb-6">
            Interactive visualization of the complete extraction process
          </p>

          {/* Flow Navigation */}
          <div className="flex items-center gap-2 bg-muted p-2 rounded-lg inline-flex">
            <Button
              size="sm"
              variant={currentStep === "input" ? "default" : "ghost"}
              onClick={() => setCurrentStep("input")}
              className={currentStep === "input" ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white" : ""}
            >
              1. Input
            </Button>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <Button
              size="sm"
              variant={currentStep === "processing" ? "default" : "ghost"}
              onClick={() => {
                setProcessingProgress(50);
                setProcessingStage(2);
                setCurrentStep("processing");
              }}
              className={currentStep === "processing" ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white" : ""}
            >
              2. Processing
            </Button>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <Button
              size="sm"
              variant={currentStep === "results" ? "default" : "ghost"}
              onClick={() => setCurrentStep("results")}
              className={currentStep === "results" ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white" : ""}
            >
              3. Results
            </Button>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <Button
              size="sm"
              variant={currentStep === "success" ? "default" : "ghost"}
              onClick={() => setCurrentStep("success")}
              className={currentStep === "success" ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white" : ""}
            >
              4. Success
            </Button>
          </div>
        </div>

        {/* Flow Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Input Methods */}
          {currentStep === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl mb-2" style={{ fontWeight: 600 }}>
                    Step 1: Choose Input Method
                  </h2>
                  <p className="text-muted-foreground">
                    Select how you want to provide your research document
                  </p>
                </div>

                {/* Input Method Selector */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInputMethod("pdf")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      inputMethod === "pdf"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg"
                        : "border-border hover:border-blue-300"
                    }`}
                  >
                    <Upload className={`w-10 h-10 mx-auto mb-3 ${
                      inputMethod === "pdf" ? "text-blue-600" : "text-muted-foreground"
                    }`} />
                    <p style={{ fontWeight: 600 }}>Upload PDF</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Drag & drop your file
                    </p>
                    {inputMethod === "pdf" && (
                      <Badge className="mt-3 bg-blue-600 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        Selected
                      </Badge>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInputMethod("url")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      inputMethod === "url"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg"
                        : "border-border hover:border-blue-300"
                    }`}
                  >
                    <LinkIcon className={`w-10 h-10 mx-auto mb-3 ${
                      inputMethod === "url" ? "text-blue-600" : "text-muted-foreground"
                    }`} />
                    <p style={{ fontWeight: 600 }}>Enter URL</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Paste a paper URL
                    </p>
                    {inputMethod === "url" && (
                      <Badge className="mt-3 bg-blue-600 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        Selected
                      </Badge>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInputMethod("manual")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      inputMethod === "manual"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg"
                        : "border-border hover:border-blue-300"
                    }`}
                  >
                    <FileText className={`w-10 h-10 mx-auto mb-3 ${
                      inputMethod === "manual" ? "text-blue-600" : "text-muted-foreground"
                    }`} />
                    <p style={{ fontWeight: 600 }}>Manual Entry</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fill form manually
                    </p>
                    {inputMethod === "manual" && (
                      <Badge className="mt-3 bg-blue-600 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        Selected
                      </Badge>
                    )}
                  </motion.button>
                </div>

                <Separator className="my-8" />

                {/* Input Area */}
                {inputMethod === "pdf" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border-2 border-dashed rounded-xl p-16 text-center transition-all ${
                      isDragging
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-105"
                        : "border-border hover:border-blue-400 bg-muted/30"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                    }}
                  >
                    <motion.div
                      animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-xl mb-2" style={{ fontWeight: 600 }}>
                        Drop your PDF here
                      </p>
                      <p className="text-muted-foreground mb-6">
                        or click to browse your files
                      </p>
                      <Button variant="outline" size="lg">
                        <Upload className="w-4 h-4 mr-2" />
                        Select PDF File
                      </Button>
                      <p className="text-xs text-muted-foreground mt-4">
                        Maximum file size: 10MB • Supported format: PDF
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {inputMethod === "url" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="text-base mb-3 block">Research Paper URL</Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          type="url"
                          placeholder="https://arxiv.org/pdf/example.pdf"
                          className="pl-11 py-6 text-base"
                        />
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                      <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm" style={{ fontWeight: 600 }}>AI-Powered Extraction</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          We'll automatically download and extract metadata from the URL
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {inputMethod === "manual" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-12 bg-muted/50 rounded-xl"
                  >
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-xl mb-2" style={{ fontWeight: 600 }}>
                      Manual Entry Mode
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Skip AI extraction and enter metadata manually
                    </p>
                    <Badge variant="secondary">
                      This will take you directly to the form
                    </Badge>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between mt-8">
                  <Button variant="outline" disabled>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                    onClick={startProcessing}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start AI Extraction
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Processing States */}
          {currentStep === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  >
                    <Sparkles className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl mb-2" style={{ fontWeight: 600 }}>
                    AI is Extracting Metadata
                  </h2>
                  <p className="text-muted-foreground">
                    Analyzing your document with advanced machine learning
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="text-sm" style={{ fontWeight: 600 }}>
                      {processingProgress}%
                    </span>
                  </div>
                  <Progress value={processingProgress} className="h-3" />
                </div>

                {/* Processing Stages */}
                <div className="space-y-3 mb-8">
                  {processingStages.map((stage, index) => {
                    const isCompleted = processingProgress >= stage.progress;
                    const isCurrent = index === processingStage;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                          isCurrent 
                            ? "bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-500" 
                            : isCompleted
                            ? "bg-green-50 dark:bg-green-950/20"
                            : "bg-muted/30"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-5 h-5 text-white" />
                            </motion.div>
                          ) : isCurrent ? (
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <div className="w-8 h-8 border-2 border-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p style={{ fontWeight: isCurrent ? 600 : 400 }}>
                            {stage.label}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Processing...
                            </p>
                          )}
                          {isCompleted && !isCurrent && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                              Completed
                            </p>
                          )}
                        </div>
                        {isCompleted && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                            Done
                          </Badge>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Info Card */}
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm" style={{ fontWeight: 600 }}>High Accuracy Extraction</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Our AI models achieve 99.5% accuracy on academic papers, trained on millions of research documents
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep("input")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Input
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep("results")}
                  >
                    Skip to Results
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Results Interface */}
          {currentStep === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* Main Form - 2/3 width */}
              <Card className="lg:col-span-2 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl mb-1" style={{ fontWeight: 600 }}>
                      Review Extracted Metadata
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Verify and edit the AI-extracted information
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Extraction Complete
                  </Badge>
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        Title *
                        {getConfidenceIcon(metadata.title.status)}
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${getConfidenceColor(metadata.title.confidence)}`}>
                          {metadata.title.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <div className="relative group">
                      <Input
                        value={metadata.title.value}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          title: { ...metadata.title, value: e.target.value }
                        })}
                        className={`${getFieldColor(metadata.title.status)} transition-all`}
                        onFocus={() => setEditingField("title")}
                        onBlur={() => setEditingField(null)}
                      />
                      <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {editingField === "title" && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-muted-foreground mt-2"
                      >
                        Source: {metadata.title.snippet}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Authors */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        Authors *
                        {getConfidenceIcon(metadata.authors.status)}
                      </Label>
                      <span className={`text-xs ${getConfidenceColor(metadata.authors.confidence)}`}>
                        {metadata.authors.confidence}% confidence
                      </span>
                    </div>
                    <div className="relative group">
                      <Input
                        value={metadata.authors.value}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          authors: { ...metadata.authors, value: e.target.value }
                        })}
                        className={`${getFieldColor(metadata.authors.status)} transition-all`}
                        onFocus={() => setEditingField("authors")}
                        onBlur={() => setEditingField(null)}
                      />
                      <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>

                  {/* Abstract */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        Abstract *
                        {getConfidenceIcon(metadata.abstract.status)}
                      </Label>
                      <span className={`text-xs ${getConfidenceColor(metadata.abstract.confidence)}`}>
                        {metadata.abstract.confidence}% confidence
                      </span>
                    </div>
                    <div className="relative group">
                      <Textarea
                        value={metadata.abstract.value}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          abstract: { ...metadata.abstract, value: e.target.value }
                        })}
                        className={`${getFieldColor(metadata.abstract.status)} transition-all`}
                        rows={4}
                        onFocus={() => setEditingField("abstract")}
                        onBlur={() => setEditingField(null)}
                      />
                      <Edit3 className="absolute right-3 top-3 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Keywords */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center gap-2">
                          Keywords
                          {getConfidenceIcon(metadata.keywords.status)}
                        </Label>
                        <span className={`text-xs ${getConfidenceColor(metadata.keywords.confidence)}`}>
                          {metadata.keywords.confidence}%
                        </span>
                      </div>
                      <Input
                        value={metadata.keywords.value}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          keywords: { ...metadata.keywords, value: e.target.value }
                        })}
                        className={`${getFieldColor(metadata.keywords.status)} transition-all`}
                      />
                    </motion.div>

                    {/* Publication Date */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center gap-2">
                          Publication Date *
                          {getConfidenceIcon(metadata.publicationDate.status)}
                        </Label>
                        <span className={`text-xs ${getConfidenceColor(metadata.publicationDate.confidence)}`}>
                          {metadata.publicationDate.confidence}%
                        </span>
                      </div>
                      <Input
                        type="date"
                        value={metadata.publicationDate.value}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          publicationDate: { ...metadata.publicationDate, value: e.target.value }
                        })}
                        className={`${getFieldColor(metadata.publicationDate.status)} transition-all`}
                      />
                    </motion.div>

                    {/* Publisher */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center gap-2">
                          Publisher
                          {getConfidenceIcon(metadata.publisher.status)}
                        </Label>
                        <span className={`text-xs ${getConfidenceColor(metadata.publisher.confidence)}`}>
                          {metadata.publisher.confidence}%
                        </span>
                      </div>
                      <Input
                        value={metadata.publisher.value}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          publisher: { ...metadata.publisher, value: e.target.value }
                        })}
                        className={`${getFieldColor(metadata.publisher.status)} transition-all`}
                      />
                    </motion.div>

                    {/* Volume */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center gap-2">
                          Volume
                          {getConfidenceIcon(metadata.volume.status)}
                        </Label>
                        <span className={`text-xs ${getConfidenceColor(metadata.volume.confidence)}`}>
                          {metadata.volume.confidence}%
                        </span>
                      </div>
                      <Input
                        value={metadata.volume.value}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          volume: { ...metadata.volume, value: e.target.value }
                        })}
                        className={`${getFieldColor(metadata.volume.status)} transition-all`}
                      />
                    </motion.div>

                    {/* Issue - Empty Field */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center gap-2">
                          Issue
                          {getConfidenceIcon(metadata.issue.status)}
                        </Label>
                        <span className="text-xs text-red-600 dark:text-red-400">
                          Manual input required
                        </span>
                      </div>
                      <Input
                        value={metadata.issue.value}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          issue: { ...metadata.issue, value: e.target.value }
                        })}
                        className={`${getFieldColor(metadata.issue.status)} transition-all`}
                        placeholder="Enter issue number..."
                      />
                    </motion.div>

                    {/* Pages */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center gap-2">
                          Pages
                          {getConfidenceIcon(metadata.pages.status)}
                        </Label>
                        <span className={`text-xs ${getConfidenceColor(metadata.pages.confidence)}`}>
                          {metadata.pages.confidence}%
                        </span>
                      </div>
                      <Input
                        value={metadata.pages.value}
                        onChange={(e) => setMetadata({
                          ...metadata,
                          pages: { ...metadata.pages, value: e.target.value }
                        })}
                        className={`${getFieldColor(metadata.pages.status)} transition-all`}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep("processing")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                    onClick={() => setCurrentStep("success")}
                  >
                    Register DOI
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>

              {/* Side Panel - 1/3 width */}
              <div className="space-y-6">
                {/* Document Preview */}
                <Card className="p-6">
                  <h3 className="mb-4 flex items-center gap-2" style={{ fontWeight: 600 }}>
                    <FileText className="w-5 h-5" />
                    Original Document
                  </h3>
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg mb-4 flex items-center justify-center border-2 border-border">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">PDF Preview</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Document
                  </Button>
                </Card>

                {/* Confidence Legend */}
                <Card className="p-6">
                  <h3 className="mb-4" style={{ fontWeight: 600 }}>
                    Confidence Levels
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-950/20 border-2 border-green-500 rounded" />
                      <div>
                        <p className="text-sm" style={{ fontWeight: 600 }}>High (95-100%)</p>
                        <p className="text-xs text-muted-foreground">Very confident</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-950/20 border-2 border-yellow-500 rounded" />
                      <div>
                        <p className="text-sm" style={{ fontWeight: 600 }}>Medium (85-94%)</p>
                        <p className="text-xs text-muted-foreground">Review suggested</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-950/20 border-2 border-red-500 rounded" />
                      <div>
                        <p className="text-sm" style={{ fontWeight: 600 }}>Manual Required</p>
                        <p className="text-xs text-muted-foreground">Not found</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20">
                  <h3 className="mb-4" style={{ fontWeight: 600 }}>
                    Extraction Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fields Extracted</span>
                      <span className="text-sm" style={{ fontWeight: 600 }}>8 / 10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average Confidence</span>
                      <span className="text-sm" style={{ fontWeight: 600 }}>95.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Processing Time</span>
                      <span className="text-sm" style={{ fontWeight: 600 }}>2.3s</span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success State */}
          {currentStep === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-12 text-center max-w-3xl mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-400 rounded-full mx-auto mb-6 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-14 h-14 text-white" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-3xl mb-3" style={{ fontWeight: 700 }}>
                    DOI Successfully Registered!
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Your research is now discoverable worldwide with a permanent identifier
                  </p>
                </motion.div>

                {/* DOI Display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 rounded-xl p-6 mb-8 border-2 border-blue-200 dark:border-blue-900"
                >
                  <p className="text-sm text-muted-foreground mb-2">Your DOI</p>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <p className="text-3xl" style={{ fontWeight: 700 }}>{generatedDOI}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <a 
                    href={`https://doi.org/${generatedDOI}`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    https://doi.org/{generatedDOI}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </motion.div>

                {/* Citation Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-8"
                >
                  <h3 className="mb-4" style={{ fontWeight: 600 }}>Citation Preview</h3>
                  <Card className="p-6 text-left bg-muted/50">
                    <p className="text-sm italic">
                      Chen, S., Kumar, M., & Rodriguez, E. (2024). Neural Networks in Climate Prediction: A Comprehensive Study. 
                      <i> International Journal of Climate Research</i>, 42(3), 1-24. 
                      <span className="text-blue-600 dark:text-blue-400"> https://doi.org/{generatedDOI}</span>
                    </p>
                  </Card>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="grid grid-cols-3 gap-4 mb-8"
                >
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 mb-2">
                      Active
                    </Badge>
                    <p className="text-xs text-muted-foreground">Status</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-xl mb-1" style={{ fontWeight: 700 }}>95.8%</p>
                    <p className="text-xs text-muted-foreground">AI Confidence</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-xl mb-1" style={{ fontWeight: 700 }}>Just now</p>
                    <p className="text-xs text-muted-foreground">Registered</p>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button 
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Certificate
                  </Button>
                  <Button 
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                    onClick={() => {
                      setCurrentStep("input");
                      setProcessingProgress(0);
                      setProcessingStage(0);
                    }}
                  >
                    Create Another DOI
                  </Button>
                </motion.div>

                {/* Back Button */}
                <div className="mt-6">
                  <Button 
                    variant="ghost"
                    onClick={() => setCurrentStep("results")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Results
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
