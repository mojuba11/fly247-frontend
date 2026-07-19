"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { loginSchema } from "@/utils/authSchema";

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
        router.push("/admin/dashboard");
      } else {
        router.push("/user/profile");
      }
    } catch (err: any) {
      setErrors({ 
        general: err.response?.data?.message || "Connection failed. Ensure the backend is running on port 5000." 
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-flyBlue p-12 text-white hidden md:flex flex-col justify-center w-1/2">
          <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
          <p className="text-blue-100">Sign in to manage your bookings and explore exclusive deals.</p>
        </div>
        
        <div className="p-12 w-full md:w-1/2">
          {/* LOGO SECTION */}
          <div className="mb-8">
            <img 
              src="/fly247logo5.jpeg" 
              alt="Fly247 Logo" 
              className="h-16 w-auto object-contain" 
            />
          </div>
          
          {errors.general && <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-lg text-sm">{errors.general}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                value={formData.email}
                required
                className="w-full text-black mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-flyOrange" 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                value={formData.password}
                required
                className="w-full text-black mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-flyOrange" 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition ${loading ? 'bg-gray-400' : 'bg-flyBlue hover:bg-blue-900'}`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account? <Link href="/register" className="text-flyOrange font-bold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
