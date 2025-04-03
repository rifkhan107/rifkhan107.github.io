
import { MongoClient, Collection } from "mongodb";

interface VisitorData {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  page: string;
  referrer: string;
  country?: string;
  countryCode?: string;
}

class AnalyticsService {
  private initialized = false;
  private adminPassword = "rifkhan-admin"; // Simple admin password for demonstration
  private mongoClient: MongoClient | null = null;
  private visitorsCollection: Collection | null = null;
  private uri = "mongodb+srv://rifkhan561:<db_password>@rifkhan107githubio-clus.ishqmu5.mongodb.net/?retryWrites=true&w=majority&appName=rifkhan107githubio-cluster";

  async init() {
    if (this.initialized) return;
    
    try {
      // Connect to MongoDB
      this.mongoClient = new MongoClient(this.uri.replace("<db_password>", "your-password-here"));
      await this.mongoClient.connect();
      const db = this.mongoClient.db("portfolio_analytics");
      this.visitorsCollection = db.collection("visitors");
      this.initialized = true;
      console.log("MongoDB connection established");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      // Fallback to localStorage if MongoDB connection fails
      this.loadVisitorsFromLocalStorage();
    }
  }

  private loadVisitorsFromLocalStorage() {
    try {
      const savedData = localStorage.getItem('visitor_analytics');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (e) {
      console.error('Failed to load visitor data from localStorage:', e);
    }
    return [];
  }

  async trackPageView() {
    try {
      // Initialize if not already done
      if (!this.initialized) {
        await this.init();
      }

      // Get IP address using a public API
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      
      // Get country information based on IP
      let country = "";
      let countryCode = "";
      
      try {
        const geoResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const geoData = await geoResponse.json();
        
        if (geoData && !geoData.error) {
          country = geoData.country_name || "";
          countryCode = geoData.country_code || "";
        }
      } catch (error) {
        console.error('Failed to fetch geolocation data:', error);
      }
      
      const visitorData: VisitorData = {
        timestamp: new Date().toISOString(),
        ipAddress: ipData.ip,
        userAgent: navigator.userAgent,
        page: window.location.pathname,
        referrer: document.referrer || 'direct',
        country,
        countryCode
      };

      // Store to MongoDB if connected
      if (this.visitorsCollection) {
        try {
          await this.visitorsCollection.insertOne(visitorData);
          console.log('Visitor tracked in MongoDB:', visitorData);
        } catch (error) {
          console.error('Failed to store visitor data in MongoDB:', error);
          // Fallback to localStorage
          this.storeVisitorToLocalStorage(visitorData);
        }
      } else {
        // Fallback to localStorage if MongoDB is not available
        this.storeVisitorToLocalStorage(visitorData);
      }
      
      return visitorData;
    } catch (error) {
      console.error('Failed to track visitor:', error);
      return null;
    }
  }

  private storeVisitorToLocalStorage(visitorData: VisitorData) {
    try {
      const existingData = this.loadVisitorsFromLocalStorage();
      existingData.push(visitorData);
      localStorage.setItem('visitor_analytics', JSON.stringify(existingData));
      console.log('Visitor tracked in localStorage:', visitorData);
    } catch (error) {
      console.error('Failed to store visitor data in localStorage:', error);
    }
  }

  async getVisitors() {
    if (!this.initialized) {
      await this.init();
    }

    if (this.visitorsCollection) {
      try {
        const visitors = await this.visitorsCollection.find({}).toArray();
        return visitors;
      } catch (error) {
        console.error('Failed to fetch visitors from MongoDB:', error);
        // Fallback to localStorage
        return this.loadVisitorsFromLocalStorage();
      }
    }

    // Return from localStorage if MongoDB is not available
    return this.loadVisitorsFromLocalStorage();
  }

  async getVisitCount() {
    if (!this.initialized) {
      await this.init();
    }

    if (this.visitorsCollection) {
      try {
        return await this.visitorsCollection.countDocuments();
      } catch (error) {
        console.error('Failed to count visitors from MongoDB:', error);
        // Fallback to localStorage
        return this.loadVisitorsFromLocalStorage().length;
      }
    }

    // Fallback to localStorage
    return this.loadVisitorsFromLocalStorage().length;
  }

  async getUniqueVisitorCount() {
    if (!this.initialized) {
      await this.init();
    }

    if (this.visitorsCollection) {
      try {
        const uniqueIps = await this.visitorsCollection.distinct('ipAddress');
        return uniqueIps.length;
      } catch (error) {
        console.error('Failed to count unique visitors from MongoDB:', error);
        // Fallback to localStorage
        const visitors = this.loadVisitorsFromLocalStorage();
        const uniqueIps = new Set(visitors.map(visitor => visitor.ipAddress));
        return uniqueIps.size;
      }
    }

    // Fallback to localStorage
    const visitors = this.loadVisitorsFromLocalStorage();
    const uniqueIps = new Set(visitors.map(visitor => visitor.ipAddress));
    return uniqueIps.size;
  }

  verifyAdmin(password: string): boolean {
    return password === this.adminPassword;
  }
}

// Singleton instance
export const analyticsService = new AnalyticsService();
