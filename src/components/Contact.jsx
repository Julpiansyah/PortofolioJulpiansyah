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
    <section id="contact" className="py-24 sm:py-32 bg-white dark:bg-navy-950 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-navy-900 dark:text-white mb-6 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-lg text-navy-500 dark:text-cream-200/70 max-w-2xl mx-auto">
            Let's talk about your next project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-navy-900 dark:text-white">
              Contact Information
            </h3>

            <div className="space-y-5">
              {contactInfo.map((item) => {
                const content = (
                  <div className="flex items-center gap-5 p-5 rounded-2xl bg-cream-50 dark:bg-navy-900/40 border border-cream-200/60 dark:border-navy-700/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:border-amber-400/30 backdrop-blur-sm group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-xl text-amber-600 dark:text-amber-400 transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-500 dark:text-cream-200/60 uppercase tracking-widest mb-1">
                        {item.label}
                      </p>
                      <p className="text-base font-medium text-navy-800 dark:text-cream-200/90">
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
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-navy-900 dark:text-white">
              Send Me a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-cream-50 dark:bg-navy-900/40 border border-cream-200/60 dark:border-navy-700/60 text-navy-900 dark:text-white placeholder:text-navy-400 dark:placeholder:text-cream-200/50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-300 text-base shadow-sm focus:-translate-y-1 focus:shadow-md"
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
                  className="w-full px-5 py-4 rounded-2xl bg-cream-50 dark:bg-navy-900/40 border border-cream-200/60 dark:border-navy-700/60 text-navy-900 dark:text-white placeholder:text-navy-400 dark:placeholder:text-cream-200/50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-300 text-base shadow-sm focus:-translate-y-1 focus:shadow-md"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-cream-50 dark:bg-navy-900/40 border border-cream-200/60 dark:border-navy-700/60 text-navy-900 dark:text-white placeholder:text-navy-400 dark:placeholder:text-cream-200/50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-300 text-base resize-none shadow-sm focus:-translate-y-1 focus:shadow-md"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-navy-800 hover:bg-navy-900 text-white font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-95 shadow-xl shadow-navy-800/20 hover:shadow-navy-800/40 text-base group"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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