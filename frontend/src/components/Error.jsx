import { useEffect, useState } from "react";

export function Error({ error }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!error || !isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-red-500/30 blur-2xl rounded-2xl opacity-50"></div>
        
        {/* Error container */}
        <div className="relative backdrop-blur-xl bg-linear-to-br from-red-900/90 via-red-800/70 to-red-900/90 border border-red-500/50 rounded-xl p-4 sm:p-5 shadow-[0_0_30px_rgba(255,0,0,0.3)] min-w-[300px] max-w-md">
          <div className="flex items-start gap-3">
            {/* Error icon */}
            <div className="shrink-0 p-2 rounded-lg bg-red-500/20 border border-red-400/30">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            {/* Error message */}
            <div className="flex-1">
              <h3 className="text-red-300 font-semibold mb-1">Error</h3>
              <p className="text-red-200 text-sm">{typeof error === 'string' ? error : error?.message || 'An error occurred'}</p>
            </div>
            
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="shrink-0 p-1 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress bar for auto-dismiss */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500/20 rounded-b-xl overflow-hidden">
            <div className="h-full bg-red-400 animate-progress-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}