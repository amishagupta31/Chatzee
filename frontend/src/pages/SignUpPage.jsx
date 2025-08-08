import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signupMutation(signupData);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-base-200"
      data-theme="night"
    >
      <div className="w-full max-w-xl mx-auto bg-base-100 border border-primary/25 rounded-xl shadow-xl p-6 sm:p-10">
        {/* LOGO */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Chatzee
          </span>
        </div>

        {/* ERROR */}
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error?.response?.data?.message || "Signup failed. Please try again."}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-center">Create an Account</h2>
              <p className="text-sm opacity-70 text-center">
                Join Chatzee and start your language learning adventure!
              </p>
            </div>

            {/* FULLNAME */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@gmail.com"
                className="input input-bordered w-full"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <p className="text-xs opacity-70 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* TERMS */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" required />
                <span className="text-xs leading-tight">
                  I agree to the{" "}
                  <span className="text-primary hover:underline">terms of service</span> and{" "}
                  <span className="text-primary hover:underline">privacy policy</span>
                </span>
              </label>
            </div>

            {/* BUTTON */}
            <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
