import { Container } from "./container/Container.jsx";

export function Loading() {
  return (
    <Container className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Main loading container */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 blur-3xl rounded-3xl opacity-50 animate-pulse"></div>
          
          {/* Main card */}
          <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,255,255,0.15)]">
            {/* Header with animated icon */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                {/* Rotating AI icon */}
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg 
                      className="w-16 h-16 text-cyan-400 animate-spin-slow" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                AI Processing
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Analyzing your content with advanced AI
              </p>
            </div>

            {/* Animated avatars section */}
            <div className="flex items-center justify-center gap-8 mb-8">
              {/* User Avatar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/30 to-purple-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-full bg-linear-to-br from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400/50 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-8 h-8 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-cyan-400 font-medium">You</span>
                </div>
              </div>

              {/* Animated connection line */}
              <div className="flex-1 max-w-32 relative">
                <div className="h-0.5 bg-linear-to-r from-cyan-500/50 via-purple-500/50 to-cyan-500/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400 to-transparent w-1/3 h-full animate-slide-right"></div>
                </div>
                {/* Pulsing dots */}
                <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Bot Avatar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-purple-500/30 to-cyan-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-full bg-linear-to-br from-purple-500/30 to-cyan-500/30 border-2 border-purple-400/50 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-8 h-8 text-purple-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-purple-400 font-medium">AI</span>
                </div>
              </div>
            </div>

            {/* Loading progress bar */}
            <div className="mb-6">
              <div className="relative h-2 bg-slate-800/60 rounded-full overflow-hidden border border-cyan-500/20">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-full animate-progress-loading"></div>
              </div>
            </div>

            {/* Animated loading dots */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>

            {/* Feature icons */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center group">
                <div className="relative inline-block p-3 rounded-xl bg-slate-800/40 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors duration-300">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mt-2">Image</p>
              </div>
              <div className="text-center group">
                <div className="relative inline-block p-3 rounded-xl bg-slate-800/40 border border-purple-500/20 group-hover:border-purple-400/50 transition-colors duration-300">
                  <svg className="w-6 h-6 text-purple-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mt-2">Processing</p>
              </div>
              <div className="text-center group">
                <div className="relative inline-block p-3 rounded-xl bg-slate-800/40 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors duration-300">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mt-2">Caption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}