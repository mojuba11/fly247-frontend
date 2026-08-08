"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, AlertCircle } from 'lucide-react';
import { registerUser } from '@/lib/api'; // Or your custom registration API function

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Split full name for APIs expecting first and last name if needed
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || 'User';
      const lastName = nameParts.slice(1).join(' ') || 'Member';

      const payload = {
        first_name: firstName,
        last_name: lastName,
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      };

      // Call your backend API registration function
      const response = await registerUser(payload);

      if (response && (response.success || response.token || response.data)) {
        // Redirect to login or user dashboard upon successful registration
        router.push('/login?registered=true');
      } else {
        throw new Error(response?.message || 'Registration failed. Please try again.');
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Branding Panel */}
        <div className="bg-flyBlue p-12 text-white hidden md:flex flex-col justify-center w-1/2">
          <div className="bg-orange-500/20 p-4 rounded-2xl w-fit mb-6 text-flyOrange">
            <UserPlus size={32} />
          </div>
          <h2 className="text-4xl font-black mb-4">Start Your Journey</h2>
          <p className="text-blue-100 leading-relaxed">
            Create an account to manage your flight bookings, track travel itineraries, and access exclusive member rewards with Fly247.
          </p>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your details to get started.</p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="John Doe"
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-flyBlue outline-none text-zinc-900" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-flyBlue outline-none text-zinc-900" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <input 
                type="password" 
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-flyBlue outline-none text-zinc-900" 
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-flyOrange text-white py-4 rounded-xl font-black hover:bg-orange-600 transition shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account? <Link href="/login" className="text-flyBlue font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
