import { Container } from "./container/Container.jsx";

export function MainLoading() {
  return (
    <Container className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main loading container */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-2 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-50 animate-pulse"></div>

          {/* Main card - Glassy Style */}
          <div className="relative backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-cyan-900/10 ring-1 ring-white/5">
            <div className="text-center">
              {/* Animated Database Icon */}
              <div className="mb-8 flex justify-center">
                <div className="relative p-6 rounded-full bg-slate-800/50 border-2 border-slate-700 shadow-lg">
                  <div className="animate-[float_3s_ease-in-out_infinite]">
                    <svg
                      className="w-16 h-16 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M12 5c4.418 0 8-1.79 8-4H4c0 2.21 3.582 4 8 4z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                Loading Data
              </h1>
              <p className="text-slate-400 text-sm sm:text-base tracking-wide mb-8">
                Retrieving your information, please wait...
              </p>

              {/* Animated loading dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for animations (no logic change) */}
      <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes animate-bounce {
      0%, 100% { transform: translateY(0); opacity: 1; }
      50% { transform: translateY(-8px); opacity: 0.7; }
    }
  `}</style>
    </Container>
  );
}
