'use client';

import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marlon Misra',
      role: 'Cofounder/CEO',
      avatar: 'https://i.pravatar.cc/150?img=11',
      content: 'The Acceler theme completely transformed my blog. It\'s fast, beautiful, and my readers love the experience.'
    },
    {
      id: 2,
      name: 'Sarah Kloboves',
      role: 'Content Manager',
      avatar: 'https://i.pravatar.cc/150?img=5',
      content: 'I\'ve tried many Ghost themes, but the quality and support I get from Ghost Theme is unmatched. Highly recommended!'
    },
    {
      id: 3,
      name: 'Fouad AlFarhan',
      role: 'Co-Founder',
      avatar: 'https://i.pravatar.cc/150?img=33',
      content: 'The customization service was a game-changer for me. I got exactly what I wanted without needing to touch any code.'
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-slate-900 mb-6">What Our Clients Say</h2>
          <p className="text-lg text-slate-600">Don't just take our word for it. Here's what successful independent
            publishers have to say about our themes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative group hover:shadow-lg transition-shadow duration-300"
            >
              <svg 
                className="w-10 h-10 text-brand-primary/20 mb-6 absolute top-8 right-8 group-hover:text-brand-primary/40 transition-colors"
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  d="M14.017 21L14.017 18C14.017 16.0547 15.6599 15.1119 19.9997 15.0001L19.9997 8.99996C16.8258 8.99996 14.8647 10.9753 14.017 12.0838L14.017 3.00004L21.9997 3.00004L21.9997 21L14.017 21ZM5.01664 21L5.01664 18C5.01664 16.0547 6.65961 15.1119 10.9994 15.0001L10.9994 8.99996C7.82548 8.99996 5.86443 10.9753 5.01664 12.0838L5.01664 3.00004L12.9994 3.00004L12.9994 21L5.01664 21Z"
                />
              </svg>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;