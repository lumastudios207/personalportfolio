"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener("open-contact-modal", handler)
    return () => window.removeEventListener("open-contact-modal", handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    if (isOpen) window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.message.trim() !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to send")
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setStatus("idle")
      setErrors({})
    }, 300)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm font-medium tracking-wide uppercase transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        Contact
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              onClick={handleClose}
            >
            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-h-[90vh] max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with surface background */}
              <div className="relative rounded-t-xl bg-[var(--color-surface)] px-8 py-8 md:px-12 md:py-10">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/5"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 className="text-2xl font-bold text-[var(--color-text)] md:text-3xl">Get in Touch</h2>
                <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-[var(--color-text-muted)]">
                  Have a project in mind or want to discuss a potential collaboration? Fill out the form below and I'll get back to you shortly.
                </p>
              </div>

              {/* Body */}
              <div className="px-8 py-8 md:px-12 md:py-10">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/20">
                      <svg className="h-8 w-8 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-medium text-[var(--color-text)]">Message sent</h3>
                    <p className="mb-8 text-sm text-[var(--color-text-muted)]">
                      Thanks for reaching out. I'll get back to you shortly.
                    </p>
                    <button
                      onClick={handleClose}
                      className="text-sm font-medium text-[var(--color-accent)] transition-opacity hover:opacity-80"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Form + Schedule a call — side by side on desktop */}
                    <div className="flex flex-col gap-8 md:flex-row md:gap-10">
                      {/* Left: Form */}
                      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5" noValidate>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          {/* Name */}
                          <div>
                            <label htmlFor="modal-name" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                              Name
                            </label>
                            <input
                              type="text"
                              id="modal-name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)]/50 focus:border-[var(--color-accent)] ${
                                errors.name ? "border-red-400" : "border-black/[0.18]"
                              }`}
                              placeholder="Your name"
                            />
                            {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                          </div>

                          {/* Email */}
                          <div>
                            <label htmlFor="modal-email" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                              Email
                            </label>
                            <input
                              type="email"
                              id="modal-email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)]/50 focus:border-[var(--color-accent)] ${
                                errors.email ? "border-red-400" : "border-black/[0.18]"
                              }`}
                              placeholder="your@email.com"
                            />
                            {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="modal-message" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                            Message
                          </label>
                          <textarea
                            id="modal-message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            className={`w-full resize-none rounded-md border bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)]/50 focus:border-[var(--color-accent)] ${
                              errors.message ? "border-red-400" : "border-black/[0.18]"
                            }`}
                            placeholder="Tell me about your project..."
                          />
                          {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                        </div>

                        {status === "error" && (
                          <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                        )}

                        <button
                          type="submit"
                          disabled={!isFormValid || status === "submitting"}
                          className="w-full cursor-pointer rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-background)] transition-all hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {status === "submitting" ? "Sending..." : "Send Message"}
                        </button>
                      </form>

                      {/* Right: Schedule a call */}
                      <div className="flex flex-col justify-center rounded-md border border-black/[0.1] bg-[var(--color-surface)] px-5 py-6 text-center md:w-[260px] md:shrink-0">
                        <p className="mb-3 text-base text-[var(--color-text-muted)]">
                          Prefer a conversation? Schedule a free discovery call to discuss your project.
                        </p>
                        <a
                          href="https://calendly.com/iannikov/call-with-ivan-about-design"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-accent)] bg-[var(--color-accent)]/30 px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent)]/50"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          Schedule a Call
                        </a>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.18] pt-6">
                      <div className="flex flex-wrap items-center gap-5">
                        <a
                          href="/resume.pdf"
                          download
                          className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          Download my CV
                        </a>
                      </div>

                      {/* Social icons */}
                      <div className="flex items-center gap-3">
                        <a
                          href="https://www.linkedin.com/in/iannikov/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.18] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                        >
                          <svg className="h-4 w-4 text-[var(--color-text-muted)]" viewBox="0 0 24 23" fill="currentColor">
                            <path d="M24,17.0604533 L24,25.9334065 L18.856023,25.9334065 L18.856023,17.6547102 C18.856023,15.5750342 18.112002,14.1557367 16.250053,14.1557367 C14.828691,14.1557367 13.982837,15.1122392 13.610715,16.0374944 C13.475013,16.3682696 13.440083,16.8286652 13.440083,17.2916834 L13.440083,25.9334065 L8.294376,25.9334065 C8.294376,25.9334065 8.363678,11.9120123 8.294376,10.4592913 L13.43958,10.4592913 L13.43958,12.6526852 C13.429146,12.66909 13.415587,12.6867782 13.405766,12.7026809 L13.43958,12.7026809 L13.43958,12.6526852 C14.123171,11.5998182 15.343992,10.0957623 18.07657,10.0957623 C21.462049,10.0957623 24,12.3074024 24,17.0604533 Z M2.911747,3 C1.151408,3 0,4.154644 0,5.6730401 C0,7.1583476 1.118096,8.3480332 2.84345,8.3480332 L2.877822,8.3480332 C4.672254,8.3480332 5.78823,7.1585708 5.78823,5.6730401 C5.754416,4.154644 4.672254,3 2.911747,3 Z M0.30561,25.9334065 L5.449364,25.9334065 L5.449364,10.4592913 L0.30561,10.4592913 L0.30561,25.9334065 Z" />
                          </svg>
                        </a>
                        <a
                          href="https://dribbble.com/iannikov"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Dribbble"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.18] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                        >
                          <svg className="h-4 w-4 text-[var(--color-text-muted)]" viewBox="0 0 22 22" fill="currentColor">
                            <path d="M11,0 C4.92734,0 0,4.92734 0,11 C0,17.07266 4.92734,22 11,22 C17.060736,22 22,17.07266 22,11 C22,4.92734 17.060736,0 11,0 Z M18.26572,5.070494 C19.578086,6.66919 20.36551,8.709338 20.38938,10.916488 C20.07918,10.856824 16.977224,10.224522 13.85142,10.618212 C13.779832,10.463134 13.720168,10.296088 13.648602,10.129064 C13.457708,9.67571 13.242944,9.21041 13.028202,8.76898 C16.488076,7.361178 18.062902,5.332976 18.26572,5.070494 Z M11,1.6225594 C13.38612,1.6225594 15.569422,2.51735 17.22776,3.984816 C17.060736,4.223428 15.640988,6.1204 12.300442,7.373102 C10.761388,4.545552 9.05531,2.23102 8.79285,1.873102 C9.49674,1.7060736 10.236446,1.6225594 11,1.6225594 Z M7.00326,2.505426 C7.253796,2.839474 8.92408,5.165952 10.486982,7.933838 C6.09653,9.103028 2.219096,9.0792166 1.801518,9.0792166 C2.409968,6.168118 4.378528,3.746204 7.00326,2.505426 Z M1.598698,11.011924 C1.598698,10.916488 1.598698,10.821052 1.598698,10.725594 C2.004339,10.737518 6.56183,10.797182 11.250536,9.38938 C11.524942,9.914322 11.775478,10.451188 12.01409,10.988076 C11.894784,11.02387 11.763554,11.059664 11.644248,11.095436 C6.800442,12.65836 4.223428,16.929506 4.008686,17.287424 C2.51735,15.629064 1.598698,13.421914 1.598698,11.011924 Z M11,20.401304 C8.828644,20.401304 6.82429,19.661598 5.237518,18.42082 C5.404564,18.074848 7.31346,14.40021 12.61062,12.550978 C12.63449,12.539054 12.646414,12.539054 12.670284,12.527108 C13.994574,15.951188 14.531462,18.826456 14.674616,19.649674 C13.54122,20.138822 12.300442,20.401304 11,20.401304 Z M16.23754,18.790684 C16.142082,18.218002 15.64101,15.473964 14.412156,12.097624 C17.359012,11.632324 19.936004,12.395878 20.258128,12.50326 C19.852492,15.116046 18.349232,17.370936 16.23754,18.790684 Z" />
                          </svg>
                        </a>
                        <a
                          href="https://www.behance.net/iannikov"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Behance"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.18] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                        >
                          <svg className="h-4 w-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
