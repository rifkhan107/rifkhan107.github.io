
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ExternalLink, Calendar, Tag } from "lucide-react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { motion } from "framer-motion";

// Define the type for blog posts
interface BlogPost {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  published_at: string;
  tag_list: string[];
  public_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://dev.to/api/articles?username=rifkhan107");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Generate unique tags for filtering
  const allTags = posts.reduce((acc: string[], post) => {
    post.tag_list.forEach(tag => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  // Filter posts based on active tab
  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(post => post.tag_list.includes(activeTab));

  return (
    <section id="blog" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">Knowledge Sharing</span>
          <h2 className="section-title">My Blog</h2>
          <p className="max-w-2xl mx-auto text-foreground/70 mt-4">
            Explore my technical articles and tutorials about AWS, DevOps, Cloud Computing, 
            and more on dev.to.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rifkhan"></div>
          </div>
        ) : (
          <>
            {/* Filter tabs */}
            <div className="max-w-5xl mx-auto mb-10">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-flow-col auto-cols-max gap-1 overflow-x-auto py-1 px-1 w-full justify-start mb-4 md:justify-center">
                  <TabsTrigger value="all" className="px-4 py-2">
                    All Posts
                  </TabsTrigger>
                  {allTags.slice(0, 5).map((tag) => (
                    <TabsTrigger key={tag} value={tag} className="px-4 py-2 whitespace-nowrap">
                      {tag}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                  
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-lg text-foreground/60">No posts found for this tag.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* View all link */}
            <div className="text-center mt-8">
              <a 
                href="https://dev.to/rifkhan107" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-rifkhan hover:underline font-medium"
              >
                View all posts on dev.to
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

// BlogCard Component
const BlogCard = ({ post }: { post: BlogPost }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <AnimatedCard className="h-full glass-card overflow-hidden flex flex-col">
      {post.cover_image ? (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.cover_image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-video bg-rifkhan/10 flex items-center justify-center">
          <BookOpen className="h-10 w-10 text-rifkhan/50" />
        </div>
      )}
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-foreground/60 mb-3">
          <Calendar className="h-3 w-3" />
          <time>{formatDate(post.published_at)}</time>
          <span className="mx-1">•</span>
          <span>{post.reading_time_minutes} min read</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
        
        <p className="text-foreground/70 mb-4 line-clamp-3">{post.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          {post.tag_list.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
          {post.tag_list.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
              +{post.tag_list.length - 3}
            </span>
          )}
        </div>
        
        <a 
          href={post.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-rifkhan hover:underline mt-auto font-medium text-sm"
        >
          Read Article
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </AnimatedCard>
  );
};

export default Blog;
