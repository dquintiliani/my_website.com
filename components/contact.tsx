"use client"

import { useState } from "react"

export function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error("Failed to send message")

      setSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false) 
    }
  }

  return (
    <section id="contact">
  <div className="contact-inner">
    <div>
      <p className="section-label">Get in Touch</p>
      <h2 className="contact-heading">
        {"Let's talk"}
        <br />
        {"about what's next."}
      </h2>
      <p className="contact-text">
        {
          "Whether you're hiring, building something interesting, or just want to swap notes on product and data — I'm always happy to connect."
        }
      </p>

      <div className="contact-links">
        {/* Email */}
        <a
          href="mailto:dquintilian@gmail.com"
          className="contact-link"
        >
          <span className="contact-icon">{"\u2709"}</span>
          <span>dquintilian@gmail.com</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/dominic-quintilian/"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-icon">in</span>
          <span>dominic-quintilian</span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/dquintiliani"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-icon" style={{ fontSize: "0.9rem" }}>
            {"\u2325"}
          </span>
          <span>dquintiliani</span>
        </a>
      </div>
    </div>
  </div>
</section>

  )
}
