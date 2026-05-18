import { useState } from 'react';
import { contactInfo } from '../data/portfolio';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white dark:bg-navy-950">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-navy-400 dark:text-cream-200/60">
            Let's talk about your next project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-navy-900 dark:text-white">
              Contact Information
            </h3>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const content = (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-cream-50 dark:bg-navy-900/50 border border-cream-200/50 dark:border-navy-700/50 transition-all duration-200 hover:-translate-y-0.5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-navy-400 dark:text-cream-200/50 uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-navy-700 dark:text-cream-200/80">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                if (item.link) {
                  return (
                    <a
                      key={item.label}
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : undefined}
                      rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      {content}
                    </a>
                  );
                }
                return <div key={item.label}>{content}</div>;
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-navy-900 dark:text-white">
              Send Me a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-navy-900/50 border border-cream-200/50 dark:border-navy-700/50 text-navy-900 dark:text-white placeholder:text-navy-400 dark:placeholder:text-cream-200/40 focus:outline-none focus:ring-2 focus:ring-amber-300/30 focus:border-amber-300 transition-all duration-200 text-sm"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-navy-900/50 border border-cream-200/50 dark:border-navy-700/50 text-navy-900 dark:text-white placeholder:text-navy-400 dark:placeholder:text-cream-200/40 focus:outline-none focus:ring-2 focus:ring-amber-300/30 focus:border-amber-300 transition-all duration-200 text-sm"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-navy-900/50 border border-cream-200/50 dark:border-navy-700/50 text-navy-900 dark:text-white placeholder:text-navy-400 dark:placeholder:text-cream-200/40 focus:outline-none focus:ring-2 focus:ring-amber-300/30 focus:border-amber-300 transition-all duration-200 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 hover:bg-navy-900 text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-navy-800/20 hover:shadow-navy-800/30 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Send Message</span>
              </button>

              <p className="text-xs text-navy-400 dark:text-cream-200/40">
                I'll get back to you as soon as possible.
              </p>
            </form>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="mt-20 pt-8 border-t border-cream-200/50 dark:border-navy-700/50 text-center">
          <p className="text-sm text-navy-400 dark:text-cream-200/40">
            &copy; {new Date().getFullYear()} Muhamad Mulyana Julpiansyah. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;