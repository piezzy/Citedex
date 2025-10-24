import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  FileText, 
  Eye, 
  CheckCircle2, 
  TrendingUp,
  PlusCircle,
  MoreVertical,
  ExternalLink
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DashboardHomeProps {
  onNavigate: (view: string) => void;
}

const stats = [
  {
    label: "Total DOIs",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: FileText,
    gradient: "from-blue-600 to-blue-400"
  },
  {
    label: "Monthly Views",
    value: "8,432",
    change: "+23%",
    trend: "up",
    icon: Eye,
    gradient: "from-teal-600 to-teal-400"
  },
  {
    label: "Completion Rate",
    value: "94.5%",
    change: "+5.2%",
    trend: "up",
    icon: CheckCircle2,
    gradient: "from-blue-500 to-teal-500"
  }
];

const recentDOIs = [
  {
    id: "10.1234/research.2024.001",
    title: "Neural Networks in Climate Prediction: A Comprehensive Study",
    status: "completed",
    views: 1234,
    date: "2024-10-20",
    confidence: 99.5
  },
  {
    id: "10.1234/research.2024.002",
    title: "Quantum Computing Applications in Drug Discovery",
    status: "completed",
    views: 892,
    date: "2024-10-18",
    confidence: 98.2
  },
  {
    id: "10.1234/research.2024.003",
    title: "Sustainable Energy Systems: A Meta-Analysis",
    status: "processing",
    views: 0,
    date: "2024-10-24",
    confidence: 95.8
  },
  {
    id: "10.1234/research.2024.004",
    title: "Machine Learning for Medical Imaging Diagnostics",
    status: "completed",
    views: 2145,
    date: "2024-10-15",
    confidence: 99.1
  },
  {
    id: "10.1234/research.2024.005",
    title: "Blockchain in Healthcare: Security and Privacy",
    status: "extracted",
    views: 0,
    date: "2024-10-24",
    confidence: 97.3
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">Completed</Badge>;
    case "processing":
      return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">Processing</Badge>;
    case "extracted":
      return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">Extracted</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your research overview.</p>
        </div>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
          onClick={() => onNavigate("new-doi")}
        >
          <PlusCircle className="mr-2 w-5 h-5" />
          Create New DOI
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl" style={{ fontWeight: 700 }}>{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Recent DOIs Table */}
      <Card>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl" style={{ fontWeight: 600 }}>Recent DOIs</h2>
            <p className="text-sm text-muted-foreground mt-1">Your latest DOI registrations and their status</p>
          </div>
          <Button variant="outline" onClick={() => onNavigate("my-dois")}>
            View All
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DOI / Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>AI Confidence</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentDOIs.map((doi) => (
              <TableRow key={doi.id} className="cursor-pointer hover:bg-accent">
                <TableCell>
                  <div>
                    <p className="text-sm" style={{ fontWeight: 600 }}>{doi.id}</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md truncate">
                      {doi.title}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(doi.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          doi.confidence >= 99 ? 'bg-green-500' :
                          doi.confidence >= 95 ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${doi.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm">{doi.confidence}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{doi.views.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{doi.date}</span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 border-2 border-blue-200 dark:border-blue-900">
          <h3 className="mb-2" style={{ fontWeight: 600 }}>Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check out our documentation and tutorials to get the most out of DOIsimplify.
          </p>
          <Button variant="outline">
            View Documentation
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20 border-2 border-teal-200 dark:border-teal-900">
          <h3 className="mb-2" style={{ fontWeight: 600 }}>Upgrade to Premium</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get unlimited DOI registrations, advanced analytics, and priority support.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white">
            Upgrade Now
          </Button>
        </Card>
      </div>
    </div>
  );
}
