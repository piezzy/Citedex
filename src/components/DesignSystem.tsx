import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Loader2,
  Moon,
  Sun,
  Upload,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Eye
} from "lucide-react";
import { motion } from "motion/react";

interface DesignSystemProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function DesignSystem({ darkMode, toggleDarkMode }: DesignSystemProps) {
  const [selectedTab, setSelectedTab] = useState("colors");
  const [inputValue, setInputValue] = useState("10.1234/example.doi.2024");
  const [isLoading, setIsLoading] = useState(false);

  const sections = [
    { id: "colors", label: "Color Palette" },
    { id: "typography", label: "Typography" },
    { id: "buttons", label: "Buttons" },
    { id: "forms", label: "Form Elements" },
    { id: "cards", label: "Cards" },
    { id: "status", label: "Status Indicators" },
    { id: "loading", label: "Loading States" },
    { id: "responsive", label: "Responsive" }
  ];

  const colorGroups = [
    {
      name: "Primary - Navy Blue",
      description: "Trust & Professionalism",
      colors: [
        { name: "Primary", var: "--primary", hex: "#1a365d" },
        { name: "Hover", var: "--primary-hover", hex: "#2d4a7c" },
        { name: "Active", var: "--primary-active", hex: "#0f2240" }
      ]
    },
    {
      name: "Secondary - Emerald Green",
      description: "Success & AI Features",
      colors: [
        { name: "Secondary", var: "--secondary", hex: "#047857" },
        { name: "Hover", var: "--secondary-hover", hex: "#059669" },
        { name: "Active", var: "--secondary-active", hex: "#065f46" }
      ]
    },
    {
      name: "Accent - Amber Yellow",
      description: "Warnings & Edits",
      colors: [
        { name: "Accent", var: "--accent", hex: "#d97706" },
        { name: "Hover", var: "--accent-hover", hex: "#f59e0b" },
        { name: "Active", var: "--accent-active", hex: "#b45309" }
      ]
    },
    {
      name: "Status Colors",
      description: "Semantic feedback colors",
      colors: [
        { name: "Success", var: "--success", hex: "#047857" },
        { name: "Warning", var: "--warning", hex: "#d97706" },
        { name: "Error", var: "--error", hex: "#dc2626" },
        { name: "Info", var: "--info", hex: "#1a365d" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl" style={{ fontWeight: 700 }}>Academic SaaS Design System</h1>
            <p className="text-sm text-muted-foreground">Complete component library and specifications</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={selectedTab === section.id ? "default" : "ghost"}
              onClick={() => setSelectedTab(section.id)}
              className={selectedTab === section.id ? "bg-primary hover:bg-primary-hover" : ""}
            >
              {section.label}
            </Button>
          ))}
        </div>

        {/* Color Palette Section */}
        {selectedTab === "colors" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-2">Color Palette</h2>
              <p className="text-muted-foreground">Academic-focused color system designed for trust and clarity</p>
            </div>

            {colorGroups.map((group, index) => (
              <Card key={index} className="p-6">
                <h3 className="mb-1" style={{ fontWeight: 600 }}>{group.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {group.colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="space-y-2">
                      <div
                        className="h-24 rounded-lg border-2 border-border shadow-sm"
                        style={{ backgroundColor: `var(${color.var})` }}
                      />
                      <div>
                        <p className="text-sm" style={{ fontWeight: 600 }}>{color.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
                        <p className="text-xs text-muted-foreground font-mono">{color.var}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {/* Neutral Grays */}
            <Card className="p-6">
              <h3 className="mb-1" style={{ fontWeight: 600 }}>Neutral Grays</h3>
              <p className="text-sm text-muted-foreground mb-4">Text and background colors</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "Background", var: "--background" },
                  { name: "Foreground", var: "--foreground" },
                  { name: "Muted", var: "--muted" },
                  { name: "Muted Foreground", var: "--muted-foreground" },
                  { name: "Border", var: "--border" }
                ].map((color, index) => (
                  <div key={index} className="space-y-2">
                    <div
                      className="h-24 rounded-lg border-2 border-border shadow-sm"
                      style={{ backgroundColor: `var(${color.var})` }}
                    />
                    <div>
                      <p className="text-sm" style={{ fontWeight: 600 }}>{color.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{color.var}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Typography Section */}
        {selectedTab === "typography" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-2">Typography</h2>
              <p className="text-muted-foreground">System fonts for maximum readability across all platforms</p>
            </div>

            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Heading Styles</h3>
              <div className="space-y-6">
                <div>
                  <h1>Heading 1 - Bold, 2.25rem (36px)</h1>
                  <p className="text-sm text-muted-foreground mt-1">Used for page titles</p>
                </div>
                <Separator />
                <div>
                  <h2>Heading 2 - Semibold, 1.875rem (30px)</h2>
                  <p className="text-sm text-muted-foreground mt-1">Used for section titles</p>
                </div>
                <Separator />
                <div>
                  <h3>Heading 3 - Semibold, 1.5rem (24px)</h3>
                  <p className="text-sm text-muted-foreground mt-1">Used for subsections</p>
                </div>
                <Separator />
                <div>
                  <h4>Heading 4 - Semibold, 1.125rem (18px)</h4>
                  <p className="text-sm text-muted-foreground mt-1">Used for card titles</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Body Text</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg">Large body text - 1.125rem (18px)</p>
                  <p className="text-sm text-muted-foreground">For introductory paragraphs and emphasis</p>
                </div>
                <Separator />
                <div>
                  <p>Regular body text - 1rem (16px)</p>
                  <p className="text-sm text-muted-foreground">Default text size for content</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm">Small text - 0.875rem (14px)</p>
                  <p className="text-xs text-muted-foreground">For captions and metadata</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs">Extra small text - 0.75rem (12px)</p>
                  <p className="text-xs text-muted-foreground">For footnotes</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Monospace - DOI & Code</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg font-mono">
                  10.1234/example.research.2024.001
                </div>
                <p className="text-sm text-muted-foreground">Used for DOI strings, code snippets, and technical identifiers</p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Buttons Section */}
        {selectedTab === "buttons" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-2">Buttons</h2>
              <p className="text-muted-foreground">Button variants and states for all user interactions</p>
            </div>

            {/* Primary Buttons */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Primary Buttons</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Default State</p>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" style={{ backgroundColor: "var(--primary)" }}>Small</Button>
                    <Button style={{ backgroundColor: "var(--primary)" }}>Default</Button>
                    <Button size="lg" style={{ backgroundColor: "var(--primary)" }}>Large</Button>
                    <Button size="lg" style={{ backgroundColor: "var(--primary)" }}>
                      <Upload className="w-4 h-4 mr-2" />
                      With Icon
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Hover State (hover over buttons)</p>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      style={{ backgroundColor: "var(--primary)" }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--primary-hover)"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--primary)"}
                    >
                      Hover Me
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Disabled State</p>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled style={{ backgroundColor: "var(--primary)" }}>Disabled</Button>
                    <Button disabled style={{ backgroundColor: "var(--primary)" }}>
                      <Upload className="w-4 h-4 mr-2" />
                      Disabled with Icon
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Secondary Buttons */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Secondary Buttons (Success/AI)</h3>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" style={{ backgroundColor: "var(--secondary)" }}>Small</Button>
                <Button style={{ backgroundColor: "var(--secondary)" }}>Default</Button>
                <Button size="lg" style={{ backgroundColor: "var(--secondary)" }}>Large</Button>
                <Button disabled style={{ backgroundColor: "var(--secondary)" }}>Disabled</Button>
              </div>
            </Card>

            {/* Accent Buttons */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Accent Buttons (Warning/Edit)</h3>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" style={{ backgroundColor: "var(--accent)", color: "white" }}>Small</Button>
                <Button style={{ backgroundColor: "var(--accent)", color: "white" }}>Default</Button>
                <Button size="lg" style={{ backgroundColor: "var(--accent)", color: "white" }}>Large</Button>
                <Button disabled style={{ backgroundColor: "var(--accent)", color: "white" }}>Disabled</Button>
              </div>
            </Card>

            {/* Outline Buttons */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Outline Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">Small</Button>
                <Button variant="outline">Default</Button>
                <Button variant="outline" size="lg">Large</Button>
                <Button variant="outline" disabled>Disabled</Button>
              </div>
            </Card>

            {/* Ghost Buttons */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Ghost Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" size="sm">Small</Button>
                <Button variant="ghost">Default</Button>
                <Button variant="ghost" size="lg">Large</Button>
                <Button variant="ghost" disabled>Disabled</Button>
              </div>
            </Card>

            {/* Loading Buttons */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Loading State</h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled style={{ backgroundColor: "var(--primary)" }}>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </Button>
                <Button variant="outline" disabled>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Forms Section */}
        {selectedTab === "forms" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-2">Form Elements</h2>
              <p className="text-muted-foreground">Input fields, validation states, and form controls</p>
            </div>

            {/* Text Inputs */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Text Inputs</h3>
              <div className="space-y-6 max-w-md">
                <div>
                  <Label>Default Input</Label>
                  <Input placeholder="Enter text..." />
                </div>
                <div>
                  <Label>DOI Input (Monospace)</Label>
                  <Input 
                    className="font-mono" 
                    placeholder="10.1234/example.doi"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                <div>
                  <Label>With Helper Text</Label>
                  <Input placeholder="Enter value..." />
                  <p className="text-xs text-muted-foreground mt-1">This is helper text</p>
                </div>
                <div>
                  <Label>Disabled Input</Label>
                  <Input placeholder="Disabled..." disabled />
                </div>
              </div>
            </Card>

            {/* Validation States */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Validation States</h3>
              <div className="space-y-6 max-w-md">
                <div>
                  <Label className="flex items-center gap-2">
                    Success State
                    <CheckCircle2 className="w-4 h-4" style={{ color: "var(--success)" }} />
                  </Label>
                  <Input 
                    className="border-2"
                    style={{ 
                      borderColor: "var(--success)",
                      backgroundColor: "var(--success-light)"
                    }}
                    defaultValue="Valid input"
                  />
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "var(--success)" }}>
                    <CheckCircle2 className="w-3 h-3" />
                    This field is valid
                  </p>
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    Warning State
                    <AlertTriangle className="w-4 h-4" style={{ color: "var(--warning)" }} />
                  </Label>
                  <Input 
                    className="border-2"
                    style={{ 
                      borderColor: "var(--warning)",
                      backgroundColor: "var(--warning-light)"
                    }}
                    defaultValue="Check this input"
                  />
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "var(--warning)" }}>
                    <AlertTriangle className="w-3 h-3" />
                    Please review this field
                  </p>
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    Error State
                    <AlertCircle className="w-4 h-4" style={{ color: "var(--error)" }} />
                  </Label>
                  <Input 
                    className="border-2"
                    style={{ 
                      borderColor: "var(--error)",
                      backgroundColor: "var(--error-light)"
                    }}
                    defaultValue="Invalid input"
                  />
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "var(--error)" }}>
                    <AlertCircle className="w-3 h-3" />
                    This field has an error
                  </p>
                </div>
              </div>
            </Card>

            {/* Textarea */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Textarea</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label>Abstract</Label>
                  <Textarea 
                    placeholder="Enter abstract..." 
                    rows={4}
                  />
                </div>
              </div>
            </Card>

            {/* Select */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Select Dropdown</h3>
              <div className="max-w-md">
                <Label>Publication Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="journal">Journal Article</SelectItem>
                    <SelectItem value="conference">Conference Paper</SelectItem>
                    <SelectItem value="preprint">Preprint</SelectItem>
                    <SelectItem value="thesis">Thesis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Switch */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Toggle Switch</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between max-w-md">
                  <Label>Enable notifications</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <Label>Dark mode</Label>
                  <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                </div>
              </div>
            </Card>

            {/* File Upload */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>File Upload Zone</h3>
              <div 
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                style={{ backgroundColor: "var(--input-background)" }}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p style={{ fontWeight: 600 }}>Drop your PDF here</p>
                <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Cards Section */}
        {selectedTab === "cards" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-2">Cards</h2>
              <p className="text-muted-foreground">Various card styles for different content types</p>
            </div>

            {/* Stats Cards */}
            <div>
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Stats Cards</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--primary)" }}>
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <Badge style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Total DOIs</p>
                  <p className="text-3xl" style={{ fontWeight: 700 }}>127</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--secondary)" }}>
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <Badge style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +23%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Views</p>
                  <p className="text-3xl" style={{ fontWeight: 700 }}>8,432</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--accent)", color: "white" }}>
                      <Users className="w-6 h-6" />
                    </div>
                    <Badge style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                  <p className="text-3xl" style={{ fontWeight: 700 }}>1,234</p>
                </Card>
              </div>
            </div>

            {/* Feature Cards */}
            <div>
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Feature Cards</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--primary)" }}>
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2" style={{ fontWeight: 600 }}>Real-time Analytics</h4>
                  <p className="text-muted-foreground">
                    Track citations, downloads, and engagement metrics with comprehensive dashboards.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--secondary)" }}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2" style={{ fontWeight: 600 }}>AI Metadata Extraction</h4>
                  <p className="text-muted-foreground">
                    Upload your PDF and let our AI automatically extract and validate metadata with 99.5% accuracy.
                  </p>
                </Card>
              </div>
            </div>

            {/* DOI Preview Card */}
            <div>
              <h3 className="mb-4" style={{ fontWeight: 600 }}>DOI Preview Card</h3>
              <Card className="p-6 max-w-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">DOI</p>
                    <p className="font-mono text-lg" style={{ fontWeight: 600 }}>10.1234/research.2024.001</p>
                  </div>
                  <Badge style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <Separator className="my-4" />
                <div>
                  <h4 className="mb-2" style={{ fontWeight: 600 }}>Neural Networks in Climate Prediction</h4>
                  <p className="text-sm text-muted-foreground">
                    Dr. Sarah Chen, Prof. Michael Kumar • 2024
                  </p>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Status Indicators Section */}
        {selectedTab === "status" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-2">Status Indicators</h2>
              <p className="text-muted-foreground">Badges, progress bars, and confidence meters</p>
            </div>

            {/* Badges */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Status Badges</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Success/Completed</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                    <Badge style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
                      Active
                    </Badge>
                    <Badge style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
                      Verified
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Warning/In Progress</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge style={{ backgroundColor: "var(--warning-light)", color: "var(--warning)" }}>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Processing
                    </Badge>
                    <Badge style={{ backgroundColor: "var(--warning-light)", color: "var(--warning)" }}>
                      Pending Review
                    </Badge>
                    <Badge style={{ backgroundColor: "var(--warning-light)", color: "var(--warning)" }}>
                      Low Confidence
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Error/Failed</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge style={{ backgroundColor: "var(--error-light)", color: "var(--error)" }}>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Failed
                    </Badge>
                    <Badge style={{ backgroundColor: "var(--error-light)", color: "var(--error)" }}>
                      Invalid
                    </Badge>
                    <Badge style={{ backgroundColor: "var(--error-light)", color: "var(--error)" }}>
                      Rejected
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Info/Neutral</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge style={{ backgroundColor: "var(--info-light)", color: "var(--info)" }}>
                      <Info className="w-3 h-3 mr-1" />
                      Draft
                    </Badge>
                    <Badge style={{ backgroundColor: "var(--info-light)", color: "var(--info)" }}>
                      Extracted
                    </Badge>
                    <Badge variant="secondary">New</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Progress Bars */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Progress Bars</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Extraction Progress</span>
                    <span className="text-sm" style={{ fontWeight: 600 }}>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Processing</span>
                    <span className="text-sm" style={{ fontWeight: 600 }}>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Complete</span>
                    <span className="text-sm" style={{ fontWeight: 600 }}>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Confidence Meters */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Confidence Meters</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>High Confidence (99.5%)</Label>
                    <CheckCircle2 className="w-5 h-5" style={{ color: "var(--success)" }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all"
                        style={{ width: "99.5%", backgroundColor: "var(--success)" }}
                      />
                    </div>
                    <span className="text-sm" style={{ fontWeight: 600, color: "var(--success)" }}>99.5%</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Medium Confidence (87.3%)</Label>
                    <AlertTriangle className="w-5 h-5" style={{ color: "var(--warning)" }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all"
                        style={{ width: "87.3%", backgroundColor: "var(--warning)" }}
                      />
                    </div>
                    <span className="text-sm" style={{ fontWeight: 600, color: "var(--warning)" }}>87.3%</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Low Confidence (62.1%)</Label>
                    <AlertCircle className="w-5 h-5" style={{ color: "var(--error)" }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all"
                        style={{ width: "62.1%", backgroundColor: "var(--error)" }}
                      />
                    </div>
                    <span className="text-sm" style={{ fontWeight: 600, color: "var(--error)" }}>62.1%</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Loading States Section */}
        {selectedTab === "loading" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-2">Loading States</h2>
              <p className="text-muted-foreground">Skeletons and loading indicators</p>
            </div>

            {/* Spinners */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Loading Spinners</h3>
              <div className="flex flex-wrap gap-8 items-center">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" style={{ color: "var(--primary)" }} />
                  <p className="text-xs text-muted-foreground">Primary</p>
                </div>
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" style={{ color: "var(--secondary)" }} />
                  <p className="text-xs text-muted-foreground">Secondary</p>
                </div>
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin mb-2" style={{ color: "var(--accent)" }} />
                  <p className="text-xs text-muted-foreground">Large</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mb-2" style={{ borderColor: "var(--primary)" }} />
                  <p className="text-xs text-muted-foreground">Custom</p>
                </div>
              </div>
            </Card>

            {/* Skeleton Cards */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Skeleton Loaders</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Card Skeleton</p>
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-12 h-12 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-3/4" />
                      </div>
                    </div>
                  </Card>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-3">List Item Skeleton</p>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Loading Button */}
            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Button Loading States</h3>
              <div className="flex flex-wrap gap-3">
                <Button 
                  disabled
                  onClick={() => setIsLoading(!isLoading)}
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </Button>
                <Button variant="outline" disabled>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Responsive Section */}
        {selectedTab === "responsive" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-2">Responsive Design</h2>
              <p className="text-muted-foreground">Breakpoints and mobile adaptations</p>
            </div>

            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Breakpoints</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p style={{ fontWeight: 600 }}>Mobile: &lt; 640px</p>
                  <p className="text-sm text-muted-foreground">Single column layout, collapsed navigation</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p style={{ fontWeight: 600 }}>Tablet: 640px - 1024px</p>
                  <p className="text-sm text-muted-foreground">Two column layout, visible navigation</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p style={{ fontWeight: 600 }}>Desktop: &gt; 1024px</p>
                  <p className="text-sm text-muted-foreground">Multi-column layout, full features</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Responsive Grid Example</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-6 bg-muted rounded-lg text-center">
                    <p style={{ fontWeight: 600 }}>Card {i}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      1 col on mobile<br />
                      2 cols on tablet<br />
                      3 cols on desktop
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Mobile-First Principles</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Touch-friendly targets (min 44x44px)</li>
                <li>• Simplified navigation on mobile</li>
                <li>• Progressive enhancement for larger screens</li>
                <li>• Optimized typography for readability</li>
                <li>• Responsive images and media</li>
              </ul>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
