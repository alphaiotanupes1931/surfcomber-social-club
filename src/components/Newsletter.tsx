import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: email.trim(),
      });

      if (error) {
        if (error.code === "23505") {
          setMessage({ type: "error", text: "You're already subscribed!" });
        } else {
          throw error;
        }
      } else {
        setMessage({ type: "success", text: "Thanks for subscribing!" });
        setEmail("");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title mb-6">stay connected</h2>
          <p className="text-muted-foreground mb-10">
            Receive exclusive updates about events, members-only gatherings, and special occasions.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="flex-1 bg-transparent border border-foreground/30 px-6 py-4 
                         text-foreground placeholder:text-muted-foreground 
                         focus:outline-none focus:border-primary transition-colors"
            />
            <motion.button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "..." : "Sign Up"}
            </motion.button>
          </form>

          {message && (
            <p className={`text-sm mt-4 ${message.type === "success" ? "text-green-500" : "text-primary"}`}>
              {message.text}
            </p>
          )}

          <p className="text-xs text-muted-foreground mt-6">
            By subscribing you agree to our{" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
