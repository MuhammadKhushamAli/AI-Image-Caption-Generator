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

        if (response.statusCode == 200) {
          dispatch(login({ userData: response.data.user }));
          navigate("/");
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, navigate]
  );
  return (
    <Container className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      {error && <Error error={error} />}
      <div className="w-full max-w-md relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-50"></div>

        {/* Form container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,255,255,0.15)] space-y-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to continue your journey
            </p>
          </div>

          {/* Input fields */}
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="futuristic-input"
              disabled={isLoading}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.{1,254}$)(?=.{1,64}@)(?![.])(?!.*\.\.)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+(?<![.])@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/.test(
                      value
                    ) || "Invalid email address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="futuristic-input"
              disabled={isLoading}
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                    "Password must contain at least 8 characters, including at least one letter and one number",
                },
              })}
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={`relative w-full px-6 py-3.5 text-base font-semibold rounded-lg transition-all duration-300 group
                            text-gray-100 bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 
                            hover:text-cyan-300 hover:border-cyan-400/70 hover:bg-linear-to-r hover:from-cyan-500/30 hover:to-purple-500/30
                            before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-cyan-500/0 before:via-purple-500/0 before:to-cyan-500/0 
                            before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                            after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-cyan-500/20 
                            after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                            hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] active:scale-95 mt-6
                            ${
                              isLoading ? "opacity-75 cursor-not-allowed" : ""
                            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading && (
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
                </div>
              )}
              <span className="absolute left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              {isLoading ? "Signing in..." : "Sign In"}
            </span>
          </Button>
        </form>
      </div>
    </Container>
  );
}
