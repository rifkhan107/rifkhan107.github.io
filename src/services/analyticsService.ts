
interface VisitorData {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  page: string;
  referrer: string;
}

class AnalyticsService {
  private visitors: VisitorData[] = [];
  private initialized = false;

  init() {
    if (this.initialized) return;
    this.initialized = true;
    
    // Try to load existing visitors from localStorage
    try {
      const savedData = localStorage.getItem('visitor_analytics');
      if (savedData) {
        this.visitors = JSON.parse(savedData);
      }
    } catch (e) {
      console.error('Failed to load visitor data:', e);
    }
  }

  async trackPageView() {
    try {
      // Get IP address using a public API
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      
      const visitorData: VisitorData = {
        timestamp: new Date().toISOString(),
        ipAddress: ipData.ip,
        userAgent: navigator.userAgent,
        page: window.location.pathname,
        referrer: document.referrer || 'direct'
      };

      this.visitors.push(visitorData);
      
      // Store in localStorage (this is just for demonstration)
      localStorage.setItem('visitor_analytics', JSON.stringify(this.visitors));
      
      console.log('Visitor tracked:', visitorData);
      return visitorData;
    } catch (error) {
      console.error('Failed to track visitor:', error);
      return null;
    }
  }

  getVisitors() {
    return [...this.visitors];
  }

  getVisitCount() {
    return this.visitors.length;
  }

  getUniqueVisitorCount() {
    const uniqueIps = new Set(this.visitors.map(visitor => visitor.ipAddress));
    return uniqueIps.size;
  }
}

// Singleton instance
export const analyticsService = new AnalyticsService();
