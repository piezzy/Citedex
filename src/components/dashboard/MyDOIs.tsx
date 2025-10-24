import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { 
  Search, 
  Filter,
  Download,
  Eye,
  MoreVertical,
  ExternalLink
} from "lucide-react";

const allDOIs = [
  {
    id: "10.1234/research.2024.001",
    title: "Neural Networks in Climate Prediction: A Comprehensive Study",
    status: "completed",
    views: 1234,
    citations: 12,
    date: "2024-10-20",
    confidence: 99.5
  },
  {
    id: "10.1234/research.2024.002",
    title: "Quantum Computing Applications in Drug Discovery",
    status: "completed",
    views: 892,
    citations: 8,
    date: "2024-10-18",
    confidence: 98.2
  },
  {
    id: "10.1234/research.2024.003",
    title: "Sustainable Energy Systems: A Meta-Analysis",
    status: "processing",
    views: 0,
    citations: 0,
    date: "2024-10-24",
    confidence: 95.8
  },
  {
    id: "10.1234/research.2024.004",
    title: "Machine Learning for Medical Imaging Diagnostics",
    status: "completed",
    views: 2145,
    citations: 23,
    date: "2024-10-15",
    confidence: 99.1
  },
  {
    id: "10.1234/research.2024.005",
    title: "Blockchain in Healthcare: Security and Privacy",
    status: "extracted",
    views: 0,
    citations: 0,
    date: "2024-10-24",
    confidence: 97.3
  },
  {
    id: "10.1234/research.2024.006",
    title: "Artificial Intelligence in Education: Opportunities and Challenges",
    status: "completed",
    views: 567,
    citations: 5,
    date: "2024-10-12",
    confidence: 98.7
  },
  {
    id: "10.1234/research.2024.007",
    title: "5G Networks and Internet of Things: A Survey",
    status: "completed",
    views: 1423,
    citations: 18,
    date: "2024-10-08",
    confidence: 99.3
  },
  {
    id: "10.1234/research.2024.008",
    title: "Deep Learning for Natural Language Processing",
    status: "completed",
    views: 3421,
    citations: 45,
    date: "2024-10-05",
    confidence: 99.8
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

export function MyDOIs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDOIs = allDOIs.filter(doi => {
    const matchesSearch = doi.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doi.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || doi.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>My DOIs</h1>
        <p className="text-muted-foreground">Manage and track all your registered DOIs</p>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by DOI or title..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="extracted">Extracted</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* DOIs Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DOI / Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Citations</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDOIs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  No DOIs found matching your search criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredDOIs.map((doi) => (
                <TableRow key={doi.id} className="cursor-pointer hover:bg-accent">
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm" style={{ fontWeight: 600 }}>{doi.id}</p>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 max-w-md">
                        {doi.title}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(doi.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{doi.views.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{doi.citations}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{doi.date}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            doi.confidence >= 99 ? 'bg-green-500' :
                            doi.confidence >= 95 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${doi.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs">{doi.confidence}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-6 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredDOIs.length} of {allDOIs.length} DOIs
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
