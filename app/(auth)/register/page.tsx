import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-flyBlue p-12 text-white hidden md:flex flex-col justify-center w-1/2">
          <h2 className="text-4xl font-bold mb-6">Start Your Journey</h2>
          <p className="text-blue-100">Create an account to start booking flights with ease.</p>
        </div>

        <div className="p-12 w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-8">Create Account</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-flyOrange outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-flyOrange outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-flyOrange outline-none" />
            </div>
            <button className="w-full bg-flyOrange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition">
              Register
            </button>
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account? <Link href="/login" className="text-flyBlue font-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}