import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { 
  TrendingUp,
  Eye,
  Users,
  FileText,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const viewsData = [
  { month: "Apr", views: 1200, citations: 8 },
  { month: "May", views: 1800, citations: 12 },
  { month: "Jun", views: 2400, citations: 18 },
  { month: "Jul", views: 3100, citations: 25 },
  { month: "Aug", views: 2800, citations: 22 },
  { month: "Sep", views: 4200, citations: 35 },
  { month: "Oct", views: 5100, citations: 48 }
];

const topDOIs = [
  { title: "Deep Learning for NLP", views: 3421, change: 23 },
  { title: "5G Networks Survey", views: 2145, change: 18 },
  { title: "Machine Learning in Medical Imaging", views: 1423, change: 12 },
  { title: "Neural Networks in Climate", views: 1234, change: -5 },
  { title: "Quantum Computing in Drug Discovery", views: 892, change: 8 }
];

const geographicData = [
  { country: "United States", value: 35, color: "#3b82f6" },
  { country: "United Kingdom", value: 22, color: "#06b6d4" },
  { country: "Germany", value: 15, color: "#14b8a6" },
  { country: "China", value: 12, color: "#10b981" },
  { country: "Others", value: 16, color: "#6366f1" }
];

const stats = [
  {
    label: "Total Views",
    value: "42,567",
    change: "+23.5%",
    trend: "up",
    icon: Eye,
    gradient: "from-blue-600 to-blue-400"
  },
  {
    label: "Unique Visitors",
    value: "12,845",
    change: "+18.2%",
    trend: "up",
    icon: Users,
    gradient: "from-teal-600 to-teal-400"
  },
  {
    label: "Total Citations",
    value: "248",
    change: "+31.4%",
    trend: "up",
    icon: FileText,
    gradient: "from-blue-500 to-teal-500"
  }
];

export function Analytics() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>Analytics</h1>
          <p className="text-muted-foreground">Track your research impact and engagement</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl" style={{ fontWeight: 700 }}>{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Views & Citations Trend */}
        <Card className="p-6">
          <h3 className="mb-6" style={{ fontWeight: 600 }}>Views & Citations Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="citations" 
                stroke="#14b8a6" 
                strokeWidth={2}
                dot={{ fill: '#14b8a6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Geographic Distribution */}
        <Card className="p-6">
          <h3 className="mb-6" style={{ fontWeight: 600 }}>Geographic Distribution</h3>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={300}>
              <PieChart>
                <Pie
                  data={geographicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {geographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {geographicData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{item.country}</p>
                    <p className="text-xs text-muted-foreground">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performing DOIs */}
      <Card>
        <div className="p-6 border-b border-border">
          <h3 style={{ fontWeight: 600 }}>Top Performing DOIs</h3>
          <p className="text-sm text-muted-foreground mt-1">Based on views in the last 30 days</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topDOIs}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="title" 
                stroke="hsl(var(--muted-foreground))"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="views" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detailed Performance */}
      <Card>
        <div className="p-6 border-b border-border">
          <h3 style={{ fontWeight: 600 }}>Detailed Performance</h3>
        </div>
        <div className="divide-y divide-border">
          {topDOIs.map((doi, index) => (
            <div key={index} className="p-6 flex items-center justify-between hover:bg-accent transition-colors">
              <div className="flex-1">
                <p style={{ fontWeight: 600 }}>{doi.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {doi.views.toLocaleString()} views
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-1 ${
                  doi.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {doi.change >= 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span className="text-sm" style={{ fontWeight: 600 }}>
                    {Math.abs(doi.change)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
