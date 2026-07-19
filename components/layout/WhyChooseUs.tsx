import { ShieldCheck, CalendarCheck, Settings, Users } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    { icon: ShieldCheck, title: "Best Price Guarantee", desc: "We compare hundreds of airlines to bring you the best prices." },
    { icon: CalendarCheck, title: "Easy Booking", desc: "Book your flights in just a few simple steps." },
    { icon: Settings, title: "Flexible Options", desc: "Change or cancel your booking with flexible options." },
    { icon: Users, title: "Trusted by Thousands", desc: "Join thousands of happy travelers who trust Fly247." },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-zinc-900 text-center mb-16">Why Choose Fly247?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <item.icon className="w-8 h-8 text-flyBlue" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-900">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}