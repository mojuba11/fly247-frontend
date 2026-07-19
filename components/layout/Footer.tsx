export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-flyOrange">Fly247</h2>
          <p className="text-gray-400 text-sm">
            Fly247 is your trusted travel partner. We make it easy to search, compare and book flights to any destination in the world.
          </p>
        </div>

        {/* Links Columns */}
        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Baggage Info</li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>+234 800 123 4567</li>
            <li>support@fly247.com</li>
            <li>12 Airport Road, Ikeja, Lagos, Nigeria.</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        © 2026 Fly247 Ltd. All rights reserved.
      </div>
    </footer>
  );
}