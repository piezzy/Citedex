import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Emily Chen",
    role: "Research Scientist",
    institution: "Stanford University",
    content: "DOIsimplify saved us countless hours. The AI extraction is incredibly accurate, and we registered 50 papers in a single afternoon. Absolutely game-changing for our lab.",
    rating: 5,
    initials: "EC"
  },
  {
    name: "Prof. Michael Rodriguez",
    role: "Department Head",
    institution: "MIT",
    content: "As someone who's struggled with traditional DOI systems for years, this platform is a breath of fresh air. Simple, fast, and it just works. Highly recommended.",
    rating: 5,
    initials: "MR"
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Independent Researcher",
    institution: "Freelance",
    content: "Finally, a DOI system designed for individual researchers! No need for institutional membership. The free tier is perfect for my needs, and the support team is incredibly responsive.",
    rating: 5,
    initials: "SJ"
  },
  {
    name: "Dr. Ahmed Hassan",
    role: "Research Fellow",
    institution: "Oxford University",
    content: "The metadata extraction is phenomenal. It catches details I would have missed manually. The analytics dashboard helps me track my research impact in real-time.",
    rating: 5,
    initials: "AH"
  },
  {
    name: "Prof. Lisa Wang",
    role: "Principal Investigator",
    institution: "Berkeley Lab",
    content: "We migrated our entire lab to DOIsimplify. The bulk upload feature and API access make it perfect for large research groups. Best investment we've made this year.",
    rating: 5,
    initials: "LW"
  },
  {
    name: "Dr. James Cooper",
    role: "Postdoctoral Researcher",
    institution: "Cambridge University",
    content: "The speed is unmatched. What used to take weeks now takes minutes. Plus, the real-time validation catches errors before submission. Couldn't be happier.",
    rating: 5,
    initials: "JC"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl md:text-5xl" style={{ fontWeight: 700 }}>
            Trusted by Researchers Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of researchers who have simplified their DOI registration process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="mb-6 text-muted-foreground">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-teal-500 text-white">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p style={{ fontWeight: 600 }}>{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.institution}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
              10K+
            </div>
            <p className="text-muted-foreground">Active Researchers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
              50K+
            </div>
            <p className="text-muted-foreground">DOIs Registered</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
              99.5%
            </div>
            <p className="text-muted-foreground">AI Accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
              24/7
            </div>
            <p className="text-muted-foreground">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
