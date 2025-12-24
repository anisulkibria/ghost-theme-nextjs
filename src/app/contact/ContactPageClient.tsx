'use client';

import { useState } from 'react';
import NewsletterCTA from '@/components/shared/NewsletterCTA';

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      console.log('Validation failed - missing fields');
      setStatus('error');
      setStatusMessage('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.log('Validation failed - invalid email');
      setStatus('error');
      setStatusMessage('Please provide a valid email address');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      console.log('Sending request to API...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response received:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setStatus('success');
        setStatusMessage(data.message);
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setStatusMessage('Network error. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto text-center px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-slate-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have a question about our themes, pricing, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Info & FAQ */}
            <div>
              <div className="mb-12">
                <h2 className="text-2xl font-bold font-serif text-slate-900 mb-6">Support Squad</h2>
                <p className="text-slate-600 mb-8">
                  We're a small team dedicated to helping you succeed. We typically reply within 24 hours.
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex -space-x-3">
                    <img className="w-12 h-12 rounded-full border-4 border-white"
                      src="https://i.pravatar.cc/100?img=1" alt="Support" />
                    <img className="w-12 h-12 rounded-full border-4 border-white"
                      src="https://i.pravatar.cc/100?img=5" alt="Support" />
                    <img className="w-12 h-12 rounded-full border-4 border-white"
                      src="https://i.pravatar.cc/100?img=8" alt="Support" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-slate-900">Contact our team</p>
                    <p className="text-slate-500">support@ghost-theme.com</p>
                  </div>
                </div>
              </div>

              {/* FAQ Sidebar */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Common Questions</h3>
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(0)}
                      className="w-full text-left px-6 py-4 font-bold text-slate-800 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors">
                      <span>Do you offer refunds?</span>
                      <svg className={`w-4 h-4 transform transition-transform ${openFAQ === 0 ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {openFAQ === 0 && (
                      <div
                        className="px-6 py-4 text-slate-600 text-sm leading-relaxed border-t border-slate-200">
                        Yes! We offer a 30-day money-back guarantee. If you're not satisfied, just email us
                        and we'll refund your purchase, no questions asked.
                      </div>
                    )}
                  </div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(1)}
                      className="w-full text-left px-6 py-4 font-bold text-slate-800 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors">
                      <span>Can I use themes on multiple sites?</span>
                      <svg className={`w-4 h-4 transform transition-transform ${openFAQ === 1 ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {openFAQ === 1 && (
                      <div
                        className="px-6 py-4 text-slate-600 text-sm leading-relaxed border-t border-slate-200">
                        Our standard license is for a single site. If you need to use a theme on multiple
                        sites or for client work, please check our All Access Pass which allows unlimited
                        usage.
                      </div>
                    )}
                  </div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(2)}
                      className="w-full text-left px-6 py-4 font-bold text-slate-800 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors">
                      <span>Do you provide installation support?</span>
                      <svg className={`w-4 h-4 transform transition-transform ${openFAQ === 2 ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {openFAQ === 2 && (
                      <div
                        className="px-6 py-4 text-slate-600 text-sm leading-relaxed border-t border-slate-200">
                        We do not log into your server to install themes, but we provide detailed
                        documentation on how to upload and activate your theme in Ghost Admin.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Functional Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 relative">
              <div
                className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-2xl z-0 pointer-events-none">
              </div>
              
              {/* Status Messages */}
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                  {statusMessage}
                </div>
              )}
              
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                  {statusMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                    <input type="text" id="name" name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all duration-200 placeholder:text-slate-400"
                      placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                    <input type="email" id="email" name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all duration-200 placeholder:text-slate-400"
                      placeholder="jane@example.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">Topic</label>
                  <select id="subject" name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all duration-200 text-slate-600 appearance-none">
                    <option value="">Select a topic</option>
                    <option value="I have a presale question">I have a presale question</option>
                    <option value="I need theme support">I need theme support</option>
                    <option value="I found a bug">I found a bug</option>
                    <option value="Other inquiry">Other inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea id="message" name="message" rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all duration-200 placeholder:text-slate-400 resize-none"
                    placeholder="Tell us how we can help..."></textarea>
                </div>
                <button type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-8 py-4 text-base font-bold text-white bg-brand-primary rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <NewsletterCTA />
    </>
  );
}