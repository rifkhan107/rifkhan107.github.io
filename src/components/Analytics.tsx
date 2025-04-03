
import { useState, useEffect } from "react";
import { analyticsService } from "@/services/analyticsService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Analytics = () => {
  const [showStats, setShowStats] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [uniqueVisitorCount, setUniqueVisitorCount] = useState(0);
  const [visitors, setVisitors] = useState<any[]>([]);

  useEffect(() => {
    if (showStats) {
      const visitorCount = analyticsService.getVisitCount();
      const uniqueCount = analyticsService.getUniqueVisitorCount();
      const visitorList = analyticsService.getVisitors();
      
      setVisitorCount(visitorCount);
      setUniqueVisitorCount(uniqueCount);
      setVisitors(visitorList);
    }
  }, [showStats]);

  if (!showStats) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setShowStats(true)}
          className="bg-rifkhan hover:bg-rifkhan/80"
        >
          View Analytics
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
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
                <CardTitle className="text-2xl">
                  {visitorCount}
                </CardTitle>
                <CardDescription>Total Page Views</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">
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
            </TabsList>
            
            <TabsContent value="list">
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {visitors.map((visitor, index) => (
                    <Card key={index} className="p-3">
                      <div className="text-sm">
                        <div className="font-medium">IP: {visitor.ipAddress}</div>
                        <div className="text-muted-foreground">Page: {visitor.page}</div>
                        <div className="text-muted-foreground">Timestamp: {new Date(visitor.timestamp).toLocaleString()}</div>
                      </div>
                    </Card>
                  ))}
                  
                  {visitors.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No visitor data recorded yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="ips">
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {[...new Set(visitors.map(v => v.ipAddress))].map((ip, index) => (
                    <Card key={index} className="p-3">
                      <div className="font-medium">{ip}</div>
                    </Card>
                  ))}
                  
                  {visitors.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No IP addresses recorded yet
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
