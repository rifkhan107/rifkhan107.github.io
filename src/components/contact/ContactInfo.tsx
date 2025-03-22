
import { Mail, MapPin, Phone } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="bg-rifkhan/10 text-rifkhan p-3 rounded-full">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-medium text-foreground">Email</h4>
          <a
            href="mailto:rifkhan561@gmail.com"
            className="text-rifkhan hover:text-rifkhan-dark transition-colors"
          >
            rifkhan561@gmail.com
          </a>
        </div>
      </div>
      
      <div className="flex items-start space-x-4">
        <div className="bg-rifkhan/10 text-rifkhan p-3 rounded-full">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-medium text-foreground">WhatsApp</h4>
          <a
            href="https://wa.me/94767730555"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rifkhan hover:text-rifkhan-dark transition-colors"
          >
            +94 767730555
          </a>
        </div>
      </div>
      
      <div className="flex items-start space-x-4">
        <div className="bg-rifkhan/10 text-rifkhan p-3 rounded-full">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-medium text-foreground">Location</h4>
          <p className="text-foreground/70">Colombo, Sri Lanka 🇱🇰</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
