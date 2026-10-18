import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-accent">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-4">
            Join the MGS Fabrics Circle
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe for exclusive access to new arrivals, special offers, and expert styling tips delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-background border-border"
              required
            />
            <Button type="submit" size="lg" className="h-12 px-8">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
