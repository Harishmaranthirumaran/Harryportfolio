import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle } from "lucide-react";

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

    // Open user's mail client with prefilled message
    const subject = `Portfolio contact — ${result.data.name}`;
    const body = `${result.data.message}\n\n— ${result.data.name}\n${result.data.email}`;
    const mailto = `mailto:harishmaran2001@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

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
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Your email client should have opened. If not, you can email me directly at{" "}
          <a className="text-indigo-600 font-medium" href="mailto:harishmaran2001@gmail.com">
            harishmaran2001@gmail.com
          </a>
        </p>
        <button
          onClick={() => setSent(false)}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Send a Message</h3>
        <p className="text-sm text-gray-500">I'll get back to you as soon as possible.</p>
      </div>

      <Field label="Your Name" error={errors.name}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          placeholder="John Doe"
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
        />
      </Field>

      <Field label="Email Address" error={errors.email}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          placeholder="you@company.com"
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
        />
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder="Tell me about your project or opportunity..."
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
        />
        <div className="text-right text-xs text-gray-400 mt-1">
          {message.length}/1000
        </div>
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    {children}
    {error && (
      <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block" />
        {error}
      </p>
    )}
  </div>
);

export default ContactForm;
