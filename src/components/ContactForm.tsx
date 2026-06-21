import { useState, useRef, memo, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

/* ─────────────────────────────────────────────
   Configuration — Replace with your EmailJS IDs
   ───────────────────────────────────────────── */

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

type FormStatus = "idle" | "sending" | "success" | "error";

interface FormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  from_name: "",
  from_email: "",
  subject: "",
  message: "",
};

/* ─────────────────────────────────────────────
   Contact Form Component
   ───────────────────────────────────────────── */

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (status === "sending") return;

      setStatus("sending");

      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current!,
          EMAILJS_PUBLIC_KEY
        );
        setStatus("success");
        setFormData(INITIAL_FORM);

        // Reset to idle after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } catch {
        setStatus("error");
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      }
    },
    [status]
  );

  const isValid =
    formData.from_name.trim() !== "" &&
    formData.from_email.trim() !== "" &&
    formData.subject.trim() !== "" &&
    formData.message.trim() !== "";

  return (
    <div className="contact-form-wrapper">
      {/* Intro text */}
      <div className="contact-intro">
        <p className="contact-intro-text">
          Have a project in mind, want to collaborate, or just want to say
          hello? Send me a message and I'll get back to you as soon as
          possible.
        </p>
        <div className="contact-email-hint">
          <span className="contact-email-hint-label">// direct email channel</span>
          <a
            href="mailto:haikaldanish0306@gmail.com"
            className="contact-email-link"
          >
            haikaldanish0306@gmail.com
          </a>
        </div>
      </div>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="contact-form"
        autoComplete="off"
      >
        {/* Hidden fields to match EmailJS template variables */}
        <input type="hidden" name="name" value={formData.from_name} />
        <input type="hidden" name="email" value={formData.from_email} />

        {/* Name + Email row */}
        <div className="contact-form-row">
          <div className="contact-field-group">
            <label htmlFor="contact-name" className="contact-label">
              <span className="contact-label-prefix">01</span>
              Name
            </label>
            <div
              className={`contact-input-wrapper ${focusedField === "from_name" ? "contact-input-focused" : ""
                }`}
            >
              <input
                id="contact-name"
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                onFocus={() => setFocusedField("from_name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Your name"
                required
                className="contact-input"
              />
            </div>
          </div>

          <div className="contact-field-group">
            <label htmlFor="contact-email" className="contact-label">
              <span className="contact-label-prefix">02</span>
              Email
            </label>
            <div
              className={`contact-input-wrapper ${focusedField === "from_email" ? "contact-input-focused" : ""
                }`}
            >
              <input
                id="contact-email"
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                onFocus={() => setFocusedField("from_email")}
                onBlur={() => setFocusedField(null)}
                placeholder="your@email.com"
                required
                className="contact-input"
              />
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="contact-field-group">
          <label htmlFor="contact-subject" className="contact-label">
            <span className="contact-label-prefix">03</span>
            Subject
          </label>
          <div
            className={`contact-input-wrapper ${focusedField === "subject" ? "contact-input-focused" : ""
              }`}
          >
            <input
              id="contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField("subject")}
              onBlur={() => setFocusedField(null)}
              placeholder="What's this about?"
              required
              className="contact-input"
            />
          </div>
        </div>

        {/* Message */}
        <div className="contact-field-group">
          <label htmlFor="contact-message" className="contact-label">
            <span className="contact-label-prefix">04</span>
            Message
          </label>
          <div
            className={`contact-input-wrapper contact-textarea-wrapper ${focusedField === "message" ? "contact-input-focused" : ""
              }`}
          >
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              placeholder="Tell me about your project, idea, or just say hi..."
              required
              rows={5}
              maxLength={2000}
              className="contact-input contact-textarea"
            />
          </div>
          <span className="contact-char-count">
            {formData.message.length} / 2000
          </span>
        </div>

        {/* Status Messages with slide-in animations */}
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div 
              key="success-alert"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="contact-status contact-status-success overflow-hidden"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Message sent successfully! I'll get back to you soon.
              </span>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div 
              key="error-alert"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="contact-status contact-status-error overflow-hidden"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                Something went wrong. Please try again or email me directly.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || status === "sending"}
          className="contact-submit"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default memo(ContactForm);
