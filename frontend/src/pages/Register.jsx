import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen text-center bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600 mb-6">Start managing your tasks today</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600! text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to={"/login"}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            disabled={loading}
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
