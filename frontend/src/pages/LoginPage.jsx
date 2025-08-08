import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginMutation(loginData);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4" data-theme="night">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[50%] border border-primary/25 bg-base-100 rounded-xl shadow-lg p-6 sm:p-8">
        {/* LOGO */}
        <div className="mb-4 flex items-center gap-2">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Chatzee
          </span>
        </div>

        {/* ERROR */}
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error?.response?.data?.message || "Login failed. Please try again."}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Welcome Back</h2>
            <p className="text-sm opacity-70">
              Sign in to your account to continue your language journey
            </p>
          </div>

          <div className="form-control w-full space-y-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="input input-bordered w-full"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-control w-full space-y-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
