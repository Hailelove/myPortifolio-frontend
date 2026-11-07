import Section from "../ui/Section";

const TESTIMONIALS = [
  {
    name: "Mr Abebe",
    role: "Software Developr",
    text: "Deme delivered our platform on time and exceeded expectations. His attention to detail and code quality is exceptional.",
  },
  {
    name: "Mr. Daniel",
    role: "Software Engineer",
    text: "A rare engineer who blends strong technical chops with great communication. He shipped features no one else could.",
  },
  {
    name: "Mrs. Alem",
    role: "AI researcher",
    text: "From architecture to deployment, Deme owned the whole stack. Our system has been rock-solid for years.",
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="What people say">
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl border bg-card shadow-sm flex flex-col justify-between"
          >
            <p className="text-muted-foreground mb-8 italic">"{t.text}"</p>
            <div>
              <p className="font-bold text-lg">{t.name}</p>
              <p className="text-sm text-primary font-medium">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
