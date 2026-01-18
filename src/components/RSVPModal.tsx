import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number is too long"),
});

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPModal = ({ isOpen, onClose }: RSVPModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = rsvpSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase.from("rsvps").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
      });

      if (error) throw error;

      // Send confirmation email (fire and forget)
      supabase.functions.invoke("send-rsvp-email", {
        body: {
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
        }
      }).catch(console.error);

      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "" });
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      setErrors({ submit: "Failed to submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="relative bg-background border border-border p-8 md:p-12 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {isSuccess ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 className="font-serif text-2xl text-foreground mb-4">Thank You!</h3>
                <p className="text-muted-foreground">Your RSVP has been submitted successfully.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-serif text-3xl text-foreground mb-2 lowercase">rsvp</h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Reserve your spot at The AI Social Klub
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full bg-transparent border border-foreground/30 px-4 py-3 
                                 text-foreground placeholder:text-muted-foreground 
                                 focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.name && (
                      <p className="text-primary text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full bg-transparent border border-foreground/30 px-4 py-3 
                                 text-foreground placeholder:text-muted-foreground 
                                 focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.email && (
                      <p className="text-primary text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full bg-transparent border border-foreground/30 px-4 py-3 
                                 text-foreground placeholder:text-muted-foreground 
                                 focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-primary text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {errors.submit && (
                    <p className="text-primary text-sm text-center">{errors.submit}</p>
                  )}

                  <motion.button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit RSVP"}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RSVPModal;
