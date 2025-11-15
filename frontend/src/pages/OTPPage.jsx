import { useForm } from "react-hook-form";
import { Container } from "../components";
import { Input } from "../components/Input.jsx";
import { useState } from "react";
import { axiosInstance } from "../axios/axios.js";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Button } from "../components/Button.jsx";
import { Error } from "../components/Error.jsx";
import { useSelector } from "react-redux";

export function OTPPage() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const email = useSelector((state) => state?.forgetPassword?.email);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post("/api/v1/users/otp-verify", {
        email: email,
        otp: data?.otp,
      });
      if (response.status === 200) {
        setError("OTP Sent Successfully");
        navigate("/change-password");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {error && <Error error={error} />}
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-linear-to-tr from-cyan-900/40 via-purple-900/30 to-slate-900/40 blur-[150px] rounded-full pointer-events-none opacity-40"></div>

      {error && <Error error={error} />}

      <div className="w-full max-w-md relative">
        {/* Background glow effect */}
        <div className="absolute -inset-2 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-60"></div>

        {/* Form container - Glassy Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-cyan-900/10 ring-1 ring-white/5 space-y-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-300 via-purple-400 to-cyan-300 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              OTP Verification
            </h1>
            <p className="text-slate-400 text-sm tracking-wide">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Input field - STYLED FOR OTP */}
          <div className="space-y-5">
            <Input
              label="OTP"
              type="number" // Type is still number for keyboard
              placeholder="_ _ _ _ _ _"
              // This className relies on your styled Input.jsx component
              className={`futuristic-input font-mono text-3xl text-center tracking-[0.8em] px-4`} // Added styles
              disabled={isLoading}
              maxLength={6} // Added maxLength for OTP
              {...register("otp", {
                required: true,
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
              {/* Updated Button Text */}
              {isLoading ? "Verifying..." : "Verify"}
            </span>
          </Button>

          {/* Resend/Sign In links */}
          <p className="text-center text-sm text-slate-400 pt-4">
            Didn't receive the code?{" "}
            <button
              type="button" // Prevents form submission
              className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300 bg-transparent border-none p-0"
            >
              Resend Code
            </button>
          </p>
        </form>
      </div>

      {/* Keyframes needed for the button shimmer */}
      <style>{`
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
    
    /* Hides the number input arrows in Chrome, Safari, Edge */
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    /* Hides the number input arrows in Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  `}</style>
    </Container>
  );
}
