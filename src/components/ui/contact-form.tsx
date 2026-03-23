"use client"

import { useState } from "react"

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

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/20">
          <svg className="h-8 w-8 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-medium text-[var(--color-text)]">Message sent</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Thanks for reaching out. I'll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-[var(--color-accent)] transition-opacity hover:opacity-80"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)]/50 focus:border-[var(--color-accent)] ${
            errors.name ? "border-red-400" : "border-black/[0.18]"
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)]/50 focus:border-[var(--color-accent)] ${
            errors.email ? "border-red-400" : "border-black/[0.18]"
          }`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full resize-none rounded-md border bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)]/50 focus:border-[var(--color-accent)] ${
            errors.message ? "border-red-400" : "border-black/[0.18]"
          }`}
          placeholder="Tell me about your project..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Error state */}
      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}
