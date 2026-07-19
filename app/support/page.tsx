"use client";
import Navbar from "@/components/layout/Navbar";
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-20 px-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-flyBlue mb-6">How can we help?</h1>
          <p className="text-lg text-gray-600">
            Our team is available 24/7 to assist with your bookings, inquiries, and technical needs.
          </p>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SupportCard 
            icon={<Phone className="text-flyOrange" size={32} />} 
            title="Call Support" 
            desc="Speak with an agent immediately."
            action="+234 806 080 1737"
          />
          <SupportCard 
            icon={<Mail className="text-flyOrange" size={32} />} 
            title="Email Us" 
            desc="Send us a detailed request."
            action="sales@fly247bookings.com"
          />
          <SupportCard 
            icon={<MessageCircle className="text-flyOrange" size={32} />} 
            title="Live Chat" 
            desc="Chat with our AI bot or a human."
            action="Start Chatting"
          />
          <SupportCard 
            icon={<HelpCircle className="text-flyOrange" size={32} />} 
            title="FAQ" 
            desc="Find answers to common questions."
            action="Browse FAQ"
          />
        </div>
      </section>
    </main>
  );
}

// Sub-component for clean card styling
function SupportCard({ icon, title, desc, action }: { icon: any, title: string, desc: string, action: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500 mb-6">{desc}</p>
      <button className="text-flyBlue font-semibold hover:underline flex items-center gap-1">
        {action} →
      </button>
    </div>
  );
}