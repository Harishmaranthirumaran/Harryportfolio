import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "Name is required" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please enter a valid email" })
    .max(255, { message: "Email must be under 255 characters" }),
  message: z
    .string()
    .trim()
    .nonempty({ message: "Message can't be empty" })
    .min(10, { message: "Tell me a bit more — at least 10 characters" })
    .max(1000, { message: "Message must be under 1000 characters" }),
});

type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: ContactErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSubmitting(true);

    // Open user's mail client with prefilled message — no backend required
    const subject = `Portfolio contact — ${result.data.name}`;
    const body = `${result.data.message}\n\n— ${result.data.name}\n${result.data.email}`;
    const mailto = `mailto:harishmaran2001@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Small delay so the spinner is visible
    setTimeout(() => {
      window.location.href = mailto;
      setSubmitting(false);
      setSent(true);
      toast.success("Message ready to send", {
        description: "Your email client just opened with the message prefilled.",
      });
      setName("");
      setEmail("");
      setMessage("");
    }, 400);
  };

  if (sent) {
    return (
      <div className="border border-primary/40 bg-primary/5 p-8 text-center">
        <div className="mono text-xs text-primary mb-3">// transmission_complete</div>
        <h3 className="font-serif text-3xl mb-3">Message ready to send ✓</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Your email client just opened with the message prefilled. If nothing happened, you can email me directly at{" "}
          <a className="text-primary underline" href="mailto:harishmaran2001@gmail.com">
            harishmaran2001@gmail.com
          </a>
          .
        </p>
        <button
          onClick={() => setSent(false)}
          className="mono text-xs px-4 py-2 border border-border hover:border-primary hover:text-primary transition-colors"
        >
          send_another()
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card/40 p-6 md:p-8 space-y-5">
      <div className="mono text-xs text-primary mb-2">// send_message()</div>

      <Field label="name" error={errors.name}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          placeholder="Your name"
          className="w-full bg-background border border-border px-3 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors mono text-sm"
        />
      </Field>

      <Field label="email" error={errors.email}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          placeholder="you@domain.com"
          className="w-full bg-background border border-border px-3 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors mono text-sm"
        />
      </Field>

      <Field label="message" error={errors.message} hint={`${message.length}/1000`}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1000}
          rows={5}
          placeholder="What would you like to discuss?"
          className="w-full bg-background border border-border px-3 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors mono text-sm resize-none"
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 mono text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> sending...
          </>
        ) : (
          <>
            transmit() <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
};

const Field = ({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <label className="mono text-xs text-muted-foreground">{label}</label>
      {hint && <span className="mono text-[10px] text-muted-foreground">{hint}</span>}
    </div>
    {children}
    {error && <p className="mono text-xs text-destructive mt-1.5">▸ {error}</p>}
  </div>
);

export default ContactForm;
