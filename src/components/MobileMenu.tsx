import { useState } from "react";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const CALENDLY_URL =
  "https://calendly.com/iannikov/call-with-ivan-about-design";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);


  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className="relative z-50 flex h-10 w-10 items-center justify-center"
      >
        <div className="flex w-6 flex-col gap-[5px]">
          <span
            className={`block h-[2px] w-full bg-[var(--color-text)] transition-all duration-300 ${
              open ? "translate-y-[7px] rotate-45 !bg-white" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-full bg-[var(--color-text)] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-full bg-[var(--color-text)] transition-all duration-300 ${
              open ? "-translate-y-[7px] -rotate-45 !bg-white" : ""
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--color-background)] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-medium text-white transition-colors hover:text-[var(--color-accent)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition-opacity hover:opacity-90"
          >
            Schedule a Call
          </a>
        </nav>
      </div>
    </div>
  );
}
