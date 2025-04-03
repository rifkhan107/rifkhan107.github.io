
import { useState, useEffect } from "react";
import { analyticsService } from "@/services/analyticsService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Globe, Flag, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define the VisitorData interface to match the one in analyticsService
interface VisitorData {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  page: string;
  referrer: string;
  country?: string;
  countryCode?: string;
}

const Analytics = () => {
  const [showStats, setShowStats] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);
  const [uniqueVisitorCount, setUniqueVisitorCount] = useState(0);
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin && showStats) {
      const visitorCount = analyticsService.getVisitCount();
      const uniqueCount = analyticsService.getUniqueVisitorCount();
      const visitorList = analyticsService.getVisitors();
      
      setVisitorCount(visitorCount);
      setUniqueVisitorCount(uniqueCount);
      setVisitors(visitorList);
    }
  }, [isAdmin, showStats]);

  const handleLogin = () => {
    if (analyticsService.verifyAdmin(password)) {
      setIsAdmin(true);
      setShowStats(true);
      setShowLoginForm(false);
      toast({
        title: "Admin Access Granted",
        description: "You now have access to analytics data.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect admin password.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Function to convert country code to flag emoji - fixed to handle string properly
  const getCountryFlag = (countryCode?: string) => {
    if (!countryCode) return "🌐";
    
    // Convert country code to flag emoji - ensure we're working with numbers
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    
    // Use spread operator with the returned array to pass as arguments
    return String.fromCodePoint(...codePoints);
  };

  if (!showStats && !showLoginForm) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setShowLoginForm(true)}
          className="bg-rifkhan hover:bg-rifkhan/80"
        >
          <Lock className="mr-2 h-4 w-4" /> Admin Analytics
        </Button>
      </div>
    );
  }

  if (showLoginForm && !isAdmin) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter admin password to view analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleLogin} className="bg-rifkhan hover:bg-rifkhan/80">
                  Login
                </Button>
                <Button variant="outline" onClick={() => setShowLoginForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Website Analytics</CardTitle>
            <CardDescription>View visitor statistics and IP addresses</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setShowStats(false)}>Close</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl flex items-center">
                  <User className="mr-2 h-5 w-5 text-muted-foreground" />
                  {visitorCount}
                </CardTitle>
                <CardDescription>Total Page Views</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-muted-foreground" />
                  {uniqueVisitorCount}
                </CardTitle>
                <CardDescription>Unique Visitors</CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <Tabs defaultValue="list">
            <TabsList className="mb-4">
              <TabsTrigger value="list">Visitor List</TabsTrigger>
              <TabsTrigger value="ips">IP Addresses</TabsTrigger>
              <TabsTrigger value="countries">Countries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visitors.map((visitor, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-xl" title={visitor.country || "Unknown"}>
                              {getCountryFlag(visitor.countryCode)}
                            </span>
                            <span className="text-sm">{visitor.country || "Unknown"}</span>
                          </div>
                        </TableCell>
                        <TableCell>{visitor.ipAddress}</TableCell>
                        <TableCell>{visitor.page}</TableCell>
                        <TableCell>{new Date(visitor.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {visitors.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No visitor data recorded yet
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="ips">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {[...new Set(visitors.map(v => v.ipAddress))].map((ip, index) => {
                    const visitorWithIp = visitors.find(v => v.ipAddress === ip);
                    return (
                      <Card key={index} className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {getCountryFlag(visitorWithIp?.countryCode)}
                          </span>
                          <div>
                            <div className="font-medium">{ip}</div>
                            <div className="text-sm text-muted-foreground">
                              {visitorWithIp?.country || "Unknown location"}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                  
                  {visitors.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No IP addresses recorded yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="countries">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {
                    // Group by country and count - with proper type handling
                    Object.entries(
                      visitors.reduce((acc, visitor) => {
                        const country = visitor.country || "Unknown";
                        if (!acc[country]) {
                          acc[country] = 0;
                        }
                        acc[country] += 1;
                        return acc;
                      }, {} as Record<string, number>)
                    )
                    .sort((a, b) => b[1] - a[1]) // Sort by count
                    .map(([country, count], index) => {
                      const countryCode = visitors.find(v => v.country === country)?.countryCode;
                      return (
                        <Card key={index} className="p-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">
                                {getCountryFlag(countryCode)}
                              </span>
                              <span className="font-medium">{country}</span>
                            </div>
                            <div className="bg-muted px-2 py-1 rounded-full text-sm">
                              {count} visitor{count !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </Card>
                      );
                    })
                  }
                  
                  {visitors.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No country data recorded yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
