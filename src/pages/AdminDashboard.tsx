
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { analyticsService } from "@/services/analyticsService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowLeftRight, UserCog, Users, ShieldCheck } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import UserManagement from "@/components/admin/UserManagement";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [visitorStats, setVisitorStats] = useState({ total: 0, unique: 0 });
  const [countryData, setCountryData] = useState<{ name: string; value: number }[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = () => {
      const userRole = authService.getCurrentUserRole();
      if (userRole !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/");
        return false;
      }
      return true;
    };
    
    const isUserAdmin = checkAdminStatus();
    setIsAdmin(isUserAdmin);
    
    if (isUserAdmin) {
      // Fetch analytics data
      const visitors = analyticsService.getVisitors();
      const visitorCount = analyticsService.getVisitCount();
      const uniqueCount = analyticsService.getUniqueVisitorCount();
      
      // Set visitor stats
      setVisitorStats({
        total: visitorCount,
        unique: uniqueCount
      });
      
      // Process country data for charts
      const countryGroups = visitors.reduce((acc, visitor) => {
        const country = visitor.country || "Unknown";
        if (!acc[country]) {
          acc[country] = 0;
        }
        acc[country] += 1;
        return acc;
      }, {} as Record<string, number>);
      
      const formattedCountryData = Object.entries(countryGroups)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6); // Get top 6 countries
      
      setCountryData(formattedCountryData);
    }
  }, [navigate, toast]);
  
  if (!isAdmin) {
    return null; // Will navigate away in useEffect
  }
  
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <ArrowLeftRight className="mr-2 h-5 w-5 text-muted-foreground" />
                    Total Visits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{visitorStats.total}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                    Unique Visitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{visitorStats.unique}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <UserCog className="mr-2 h-5 w-5 text-muted-foreground" />
                    Registered Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{authService.getUserCount()}</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visitors by Country</CardTitle>
                  <CardDescription>Top countries by number of visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer
                      config={{
                        country1: { theme: { light: '#0088FE', dark: '#0088FE' } },
                        country2: { theme: { light: '#00C49F', dark: '#00C49F' } },
                        country3: { theme: { light: '#FFBB28', dark: '#FFBB28' } },
                        country4: { theme: { light: '#FF8042', dark: '#FF8042' } },
                        country5: { theme: { light: '#8884d8', dark: '#8884d8' } },
                        country6: { theme: { light: '#82ca9d', dark: '#82ca9d' } },
                      }}
                    >
                      <BarChart data={countryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Distribution</CardTitle>
                  <CardDescription>Visitors by country (percentage)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer
                      config={{
                        country1: { theme: { light: '#0088FE', dark: '#0088FE' } },
                        country2: { theme: { light: '#00C49F', dark: '#00C49F' } },
                        country3: { theme: { light: '#FFBB28', dark: '#FFBB28' } },
                        country4: { theme: { light: '#FF8042', dark: '#FF8042' } },
                        country5: { theme: { light: '#8884d8', dark: '#8884d8' } },
                        country6: { theme: { light: '#82ca9d', dark: '#82ca9d' } },
                      }}
                    >
                      <PieChart>
                        <Pie
                          data={countryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {countryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <ShieldCheck className="h-10 w-10 text-muted-foreground mr-2" />
                  <p className="text-lg text-muted-foreground">Role management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
