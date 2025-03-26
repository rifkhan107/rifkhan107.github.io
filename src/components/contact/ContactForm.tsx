
import { useState } from "react";
import { Check, Send } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/0b0e3c3c19367b3e02760961f41190c0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `Portfolio Contact: Message from ${formState.name}`,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      setIsSubmitted(true);
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        message: "",
      });
      
      // Show success toast
      toast.success("Message sent successfully!", {
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Error sending message:", err);
      
      // Show error toast
      toast.error("Failed to send message", {
        description: "Please try again or contact directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitted ? (
        <div className="bg-rifkhan/10 text-rifkhan p-4 rounded-lg flex items-center space-x-3 animate-fade-in">
          <Check className="w-5 h-5" />
          <span>Thank you! Your message has been sent successfully to rifkhan561@gmail.com</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-rifkhan/50"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-rifkhan/50"
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-rifkhan/50 resize-none"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg transition-all ${
              isSubmitting
                ? "bg-rifkhan/70 cursor-wait"
                : "bg-rifkhan hover:bg-rifkhan-dark"
            } text-white`}
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default ContactForm;
