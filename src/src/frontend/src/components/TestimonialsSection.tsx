import { Star } from "lucide-react";
import React from "react";

interface Testimonial {
  name: string;
  business: string;
  location: string;
  text: string;
  rating: number;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    business: "Kumar Electronics",
    location: "Mumbai",
    text: "InvoiceEase has transformed how I manage my business invoices. The GST support is excellent and my clients love the professional look!",
    rating: 5,
    initials: "RK",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    name: "Priya Sharma",
    business: "Sharma Textiles",
    location: "Delhi",
    text: "Finally an invoicing app that understands Indian GST requirements. The CGST/SGST breakdown is perfect for my textile business.",
    rating: 5,
    initials: "PS",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    name: "Amit Patel",
    business: "Patel Consulting",
    location: "Ahmedabad",
    text: "The WhatsApp sharing feature is a game changer. I can send invoices to clients instantly. Highly recommend for freelancers!",
    rating: 5,
    initials: "AP",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    name: "Sunita Reddy",
    business: "Reddy Catering",
    location: "Hyderabad",
    text: "Beautiful templates and so easy to use. My catering business looks so much more professional now. Worth every rupee!",
    rating: 5,
    initials: "SR",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    name: "Vikram Singh",
    business: "Singh Transport",
    location: "Jaipur",
    text: "Managing invoices for my transport business was a nightmare before. Now it takes minutes. The PDF export is crystal clear.",
    rating: 5,
    initials: "VS",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    name: "Meera Nair",
    business: "Nair Boutique",
    location: "Kochi",
    text: "The premium templates are stunning! My boutique invoices look like they were designed by a professional. Clients always compliment them.",
    rating: 5,
    initials: "MN",
    color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  },
  {
    name: "Sanjay Deshmukh",
    business: "Deshmukh Traders",
    location: "Pune",
    text: "GST invoicing बनाना अब बहुत आसान हो गया है! Professional templates और easy sharing से business बढ़ गया है।",
    rating: 5,
    initials: "SD",
    color:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Trusted by Indian Businesses
        </h2>
        <p className="text-muted-foreground text-sm">
          Join thousands of businesses using InvoiceEase
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={`star-${t.name}-${i}`}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              "{t.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${t.color}`}
              >
                {t.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t.business} · {t.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
