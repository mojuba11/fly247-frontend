"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { loginSchema } from "@/utils/authSchema";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/auth/login", result.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      if (response.data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch (err: any) {
      setErrors({ 
        general: err.response?.data?.message || "Connection failed. Ensure the backend is running and reachable." 
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Branding Panel */}
        <div className="bg-flyBlue p-12 text-white hidden md:flex flex-col justify-center w-1/2">
          <h2 className="text-4xl font-black mb-4">Welcome Back</h2>
          <p className="text-blue-100 leading-relaxed">
            Sign in to manage your flight bookings, track itineraries, and explore exclusive member deals with Fly247.
          </p>
        </div>
        
        {/* Right Form Panel */}
        <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
          
          {/* Centered Logo Section */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/images/fly247logo5.jpeg" 
              alt="Fly247 Logo" 
              className="h-20 w-auto object-contain rounded-xl shadow-sm" 
            />
          </div>
          
          {errors.general && (
            <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle size={18} className="shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                required
                placeholder="john@example.com"
                className={`w-full text-zinc-900 p-3 border rounded-xl outline-none focus:border-flyBlue ${errors.email ? 'border-red-500 bg-red-50/50' : 'border-gray-200'}`} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <input 
                type="password" 
                value={formData.password}
                required
                placeholder="••••••••"
                className={`w-full text-zinc-900 p-3 border rounded-xl outline-none focus:border-flyBlue ${errors.password ? 'border-red-500 bg-red-50/50' : 'border-gray-200'}`} 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-black text-white transition shadow-lg mt-2 cursor-pointer ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-flyBlue hover:bg-blue-900'}`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account? <Link href="/register" className="text-flyOrange font-bold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
