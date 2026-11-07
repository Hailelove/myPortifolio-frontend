// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Mail,
//   Phone,
//   Send,
//   Loader2,
//   CheckCircle2,
//   AlertCircle,
// } from "lucide-react";
// import Section from "../ui/Section";

// // Animation Variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 30 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
// };

// const stagger = {
//   animate: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   // UI State Hooks
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(""); // Replaces the alert()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // Hide the error message as soon as the user starts typing again
//     if (errorMessage) setErrorMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrorMessage(""); // Clear any previous errors

//     try {
//       const response = await fetch("http://localhost:5000/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setIsSubmitted(true);
//         setFormData({ name: "", email: "", message: "" }); // Clear inputs

//         // Reset success checkmark after 4 seconds
//         setTimeout(() => setIsSubmitted(false), 4000);
//       } else {
//         console.error("Failed to send message to backend.");
//         setErrorMessage(
//           "Something went wrong on the server. Please try again.",
//         );
//       }
//     } catch (error) {
//       console.error("Network Error:", error);
//       setErrorMessage(
//         "Could not connect to the server. Is the backend running?",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Section id="contact" eyebrow="Contact" title="Let's build something great">
//       <motion.div
//         className="grid md:grid-cols-2 gap-10 md:gap-16"
//         variants={stagger}
//         initial="initial"
//         whileInView="animate"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         {/* Left Side: Contact Info */}
//         <motion.div
//           variants={fadeInUp}
//           className="space-y-8 flex flex-col justify-center"
//         >
//           <div className="relative bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
//             {/* Decorative quote mark */}
//             <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif select-none">
//               “
//             </div>

//             <p className="text-lg text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/40 italic">
//               Have a project in mind or just want to say hi? Feel free to reach
//               out. I usually respond within a day and am open to freelance work
//               and remote opportunities.
//             </p>

//             <div className="mt-4 text-sm text-muted-foreground/70">
//               — Available for collaboration
//             </div>
//           </div>

//           <div className="space-y-6 pt-2">
//             <a
//               href="mailto:haile11new@gmail.com"
//               className="group flex items-center gap-4 text-sm font-medium transition-colors hover:text-primary"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
//                 <Mail className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
//               </div>
//               <span className="text-base">haile11new@gmail.com</span>
//             </a>

//             <a
//               href="tel:+251977194140"
//               className="group flex items-center gap-4 text-sm font-medium transition-colors hover:text-primary"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
//                 <Phone className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
//               </div>
//               <span className="text-base">+251 977 194 140</span>
//             </a>

//             <div className="group flex items-center gap-4 text-sm font-medium">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
//                 <MapPin className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
//               </div>
//               <span className="text-base text-foreground">
//                 Addis Ababa, Ethiopia
//               </span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right Side: Interactive Form */}
//         <motion.form
//           variants={fadeInUp}
//           onSubmit={handleSubmit}
//           className="relative rounded-3xl border border-border bg-card p-8 shadow-card-soft dark:bg-white/5 dark:border-white/10"
//         >
//           <div className="space-y-5">
//             <div>
//               <input
//                 required
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Your name"
//                 className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
//               />
//             </div>
//             <div>
//               <input
//                 required
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Your email"
//                 className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
//               />
//             </div>
//             <div>
//               <textarea
//                 required
//                 name="message"
//                 rows={5}
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="How can I help you?"
//                 className="w-full resize-none rounded-xl border border-border bg-background px-5 py-4 text-sm transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
//               />
//             </div>

//             {/* Inline Error Message */}
//             {errorMessage && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 className="flex items-center gap-3 text-red-500 bg-red-500/10 px-4 py-3 rounded-xl text-sm font-medium"
//               >
//                 <AlertCircle className="h-5 w-5 shrink-0" />
//                 <p>{errorMessage}</p>
//               </motion.div>
//             )}

//             <button
//               type="submit"
//               disabled={isSubmitting || isSubmitted}
//               className={`w-full flex items-center justify-center gap-2 rounded-xl px-5 py-4 font-medium transition-all duration-300 ${
//                 isSubmitted
//                   ? "bg-green-500 text-white shadow-lg shadow-green-500/25 cursor-default"
//                   : "gradient-bg text-primary-foreground shadow-elegant hover:opacity-90 hover:-translate-y-1"
//               }`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Sending...
//                 </>
//               ) : isSubmitted ? (
//                 <>
//                   <CheckCircle2 className="h-5 w-5" />
//                   Message Sent!
//                 </>
//               ) : (
//                 <>
//                   Send Message
//                   <Send className="h-4 w-4 ml-1" />
//                 </>
//               )}
//             </button>
//           </div>
//         </motion.form>
//       </motion.div>
//     </Section>
//   );
// }
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Section from "../ui/Section";
import { contactService } from "../../services/contact.service";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await contactService.submitMessage(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to submit message. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something great">
      <motion.div
        className="grid md:grid-cols-2 gap-10 md:gap-16"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Side: Contact Info */}
        <motion.div
          variants={fadeInUp}
          className="space-y-8 flex flex-col justify-center"
        >
          <div className="relative bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif select-none">
              “
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/40 italic">
              Have a project in mind or just want to say hi? Feel free to reach
              out. I usually respond within a day and am open to freelance work
              and remote opportunities.
            </p>
            <div className="mt-4 text-sm text-muted-foreground/70">
              — Available for collaboration
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <a
              href="mailto:haile11new@gmail.com"
              className="group flex items-center gap-4 text-sm font-medium transition-colors hover:text-primary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                <Mail className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              </div>
              <span className="text-base">haile11new@gmail.com</span>
            </a>

            <a
              href="tel:+251977194140"
              className="group flex items-center gap-4 text-sm font-medium transition-colors hover:text-primary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                <Phone className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              </div>
              <span className="text-base">+251 977 194 140</span>
            </a>

            <div className="group flex items-center gap-4 text-sm font-medium">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                <MapPin className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              </div>
              <span className="text-base text-foreground">
                Addis Ababa, Ethiopia
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Form */}
        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="relative rounded-3xl border border-border bg-card p-8 shadow-card-soft dark:bg-white/5 dark:border-white/10"
        >
          <div className="space-y-5">
            <div>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <div>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject (optional)"
                className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <div>
              <textarea
                required
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                className="w-full resize-none rounded-xl border border-border bg-background px-5 py-4 text-sm transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-3 text-red-500 bg-red-500/10 px-4 py-3 rounded-xl text-sm font-medium"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{errorMessage}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full flex items-center justify-center gap-2 rounded-xl px-5 py-4 font-medium transition-all duration-300 ${
                isSubmitted
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/25 cursor-default"
                  : "gradient-bg text-primary-foreground shadow-elegant hover:opacity-90 hover:-translate-y-1"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : isSubmitted ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Message Sent!
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </Section>
  );
}
