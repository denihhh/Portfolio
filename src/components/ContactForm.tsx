import { useState, useRef, memo, useCallback } from "react";
import emailjs from "@emailjs/browser";

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
   Icons
   ───────────────────────────────────────────── */

const SendIcon = memo(function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
});

const CheckIcon = memo(function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
});

const AlertIcon = memo(function AlertIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
});

const SpinnerIcon = memo(function SpinnerIcon() {
  return (
    <svg
      className="contact-spinner"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
});

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
          <span className="contact-email-hint-label">// direct email</span>
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
              className="contact-input contact-textarea"
            />
          </div>
          <span className="contact-char-count">
            {formData.message.length} / 2000
          </span>
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="contact-status contact-status-success">
            <CheckIcon />
            <span>
              Message sent successfully! I'll get back to you soon.
            </span>
          </div>
        )}

        {status === "error" && (
          <div className="contact-status contact-status-error">
            <AlertIcon />
            <span>
              Something went wrong. Please try again or email me directly.
            </span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || status === "sending"}
          className="contact-submit"
        >
          {status === "sending" ? (
            <>
              <SpinnerIcon />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <SendIcon />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
