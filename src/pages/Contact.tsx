import { useState } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your inquiry. We'll respond within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <motion.section 
          className="py-12 lg:py-16 border-b border-border"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <div className="container">
            <motion.nav variants={fadeUp} className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Contact</span>
            </motion.nav>
            <motion.h1 variants={fadeUp} className="font-display text-4xl lg:text-5xl font-semibold">
              Get in Touch
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-3 max-w-xl">
              Have questions about our fabrics or need expert guidance? We're here to help.
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Content */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeUp} className="font-display text-2xl font-semibold mb-6">Send us a Message</motion.h2>
                <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your fabric needs..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-12">
                    Send Message
                  </Button>
                </motion.form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeUp} className="font-display text-2xl font-semibold mb-6">Contact Information</motion.h2>
                <div className="space-y-8">
                  <motion.div variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Showroom Address</h3>
                      <p className="text-muted-foreground">
                        15 Savile Row<br />
                        Mayfair, London W1S 3PR<br />
                        United Kingdom
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        +44 (0) 20 7494 0000
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        enquiries@MGSfabrics.com
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Opening Hours</h3>
                      <p className="text-muted-foreground">
                        Monday – Friday: 9:00 AM – 6:00 PM<br />
                        Saturday: 10:00 AM – 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Map Placeholder */}
                <motion.div variants={fadeUp} className="mt-12 aspect-video bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Map View</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
