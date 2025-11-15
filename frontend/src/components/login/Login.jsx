import { useCallback, useState } from "react";
import { Container } from "../container/Container.jsx";
import { Input } from "../Input.jsx";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios.js";
import { useDispatch } from "react-redux";
import { login } from "../../features/authentication/authSlice.js";
import { useNavigate } from "react-router";
import { Button } from "../Button.jsx";
import { Error } from "../Error.jsx";
import { Link } from "react-router-dom";

export function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axiosInstance.post("/api/v1/users/login", data);

        if (response.status == 200) {
          setError(response.message);
          dispatch(login({ userData: response.data.user }));
          navigate("/");
        } else {
          setError(response.response.message);
        }
      } catch (error) {
        setError(error.response.message);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, navigate]
  );
  return (
    <Container className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-linear-to-tr from-cyan-900/40 via-purple-900/30 to-slate-900/40 blur-[150px] rounded-full pointer-events-none opacity-40"></div>

      {error && <Error error={error} />}

      <div className="w-full max-w-md relative">
        {/* Background glow effect */}
        <div className="absolute -inset-2 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-60"></div>

        {/* Form container - More Glassy */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-cyan-900/10 ring-1 ring-white/5 space-y-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-300 via-purple-400 to-cyan-300 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm tracking-wide">
              Sign in to continue your journey
            </p>
          </div>

          {/* Input fields */}
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              // This className is passed to your custom Input component
              className="futuristic-input"
              disabled={isLoading}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.{1,254}$)(?=.{1,64}@)(?![.])(?!.*\.\.)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+(?<![.])@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/.test(
                      value
                    ) || setError("Invalid email address"),
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              // This className is passed to your custom Input component
              className="futuristic-input"
              disabled={isLoading}
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                    setError(
                      "Password must contain at least 8 characters, including at least one letter and one number"
                    ),
                },
              })}
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={`relative w-full px-6 py-3.5 text-base font-semibold rounded-lg transition-all duration-300 group overflow-hidden
          text-white bg-slate-800/60 border border-cyan-500/30 
          hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20
          hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-[0.98] mt-6
          ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>

            <span className="relative z-10 flex items-center justify-center gap-3">
              {isLoading && (
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
                </div>
              )}
              {isLoading ? "Signing in..." : "Sign In"}
            </span>
          </Button>

          {/* Sign up link */}
          <p className="text-center text-sm text-slate-400 pt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* We need the shimmer keyframes for the button */}
      <style>{`
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}</style>
    </Container>
  );
}
