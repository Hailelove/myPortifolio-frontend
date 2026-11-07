import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 pb-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Deme Best. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            href="https://github.com/Hailelove"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/deme-best-51840a242/"
            aria-label="LinkedIn"
            className="hover:text-foreground"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href="https://wa.me/251977194140"
            aria-label="WhatsApp"
            className="hover:text-foreground"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>

          <a
            href="https://twitter.com/DemekeBest"
            aria-label="Twitter"
            className="hover:text-foreground"
          >
            <FaTwitter className="h-5 w-5" />
          </a>
          <a
            href="https://t.me/Seif_atira"
            aria-label="Telegram"
            className="hover:text-foreground"
          >
            <Send className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
