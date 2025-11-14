import { Link, NavLink } from "react-router-dom";
import { useSelector} from "react-redux";
import { useMemo, useState } from "react";
import { Button } from "../Button.jsx";
import { logout } from "../../features/authentication/authSlice.js";
import { axiosInstance } from "../../axios/axios.js";

export function Header() {
  const isLogin = useSelector((state) => state.auth.loginStatus);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await axiosInstance.get("/api/v1/users/logout");
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  const navElements = useMemo(() => [
    {
      name: "Home",
      path: "/",
      isVisible: isLogin,
    },
    {
      name: "History",
      path: "/history",
      isVisible: isLogin,
    },
    {
      name: "Login",
      path: "/login",
      isVisible: !isLogin,
    },
    {
      name: "Register",
      path: "/register",
      isVisible: !isLogin,
    },
  ], [isLogin]);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-linear-to-r from-slate-900/80 via-purple-900/60 to-slate-900/80 border-b border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 sm:space-x-3 group relative"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-2 sm:p-2.5 rounded-lg border border-cyan-500/40 bg-slate-800/60 backdrop-blur-md group-hover:border-cyan-400/70 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] group-hover:bg-slate-800/80">
              {/* Custom Futuristic Logo SVG */}
              <svg 
                className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* AI Symbol - Abstract geometric design */}
                <circle cx="50" cy="50" r="35" stroke="url(#logoGradient)" strokeWidth="3" fill="none" opacity="0.3" filter="url(#glow)"/>
                <path d="M 30 50 L 50 30 L 70 50 L 50 70 Z" stroke="url(#logoGradient)" strokeWidth="2.5" fill="url(#logoGradient)" fillOpacity="0.2" filter="url(#glow)"/>
                <circle cx="50" cy="50" r="8" fill="url(#logoGradient)" filter="url(#glow)"/>
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse hidden sm:inline-block">
              AI Caption
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex items-center space-x-1">
              {navElements.map(
                (element) =>
                  element.isVisible && (
                    <NavLink
                      key={element.name}
                      to={element.path}
                      className={({ isActive }) =>
                        `relative px-4 lg:px-6 py-2.5 lg:py-3 text-xs lg:text-sm font-semibold rounded-lg transition-all duration-300 group
                        ${
                          isActive
                            ? "text-cyan-300 bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                            : "text-gray-300 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 hover:bg-linear-to-r hover:from-cyan-500/10 hover:to-purple-500/10"
                        }
                        before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-cyan-500/0 before:via-purple-500/0 before:to-cyan-500/0 
                        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                        after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-cyan-500/20 
                        after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                        hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:scale-105`
                      }
                    >
                      <span className="relative z-10 flex items-center">
                        <span className="absolute left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                        {element.name}
                      </span>
                    </NavLink>
                  )
              )}
            </nav>
            {isLogin && (
              <Button
                onClick={handleLogout}
                className="relative ml-2 px-4 lg:px-6 py-2.5 lg:py-3 text-xs lg:text-sm font-semibold rounded-lg transition-all duration-300 group
                  text-gray-300 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 hover:bg-linear-to-r hover:from-cyan-500/10 hover:to-purple-500/10
                  before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-cyan-500/0 before:via-purple-500/0 before:to-cyan-500/0 
                  before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                  after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-cyan-500/20 
                  after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                  hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  <span className="absolute left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  Sign out
                </span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-cyan-500/30 bg-slate-800/60 backdrop-blur-sm text-cyan-400 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Animated bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 right-0 backdrop-blur-xl bg-linear-to-b from-slate-900/95 via-purple-900/80 to-slate-900/95 border-b border-cyan-500/30 shadow-[0_10px_40px_rgba(0,255,255,0.15)] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-2">
          {navElements.map(
            (element) =>
              element.isVisible && (
                <NavLink
                  key={element.name}
                  to={element.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `relative px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                    ${
                      isActive
                        ? "text-cyan-300 bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                        : "text-gray-300 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 hover:bg-linear-to-r hover:from-cyan-500/10 hover:to-purple-500/10"
                    }
                    before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-cyan-500/0 before:via-purple-500/0 before:to-cyan-500/0 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                    after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-cyan-500/20 
                    after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                    hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] active:scale-95`
                  }
                >
                  <span className="relative z-10 flex items-center">
                    <span className="absolute left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                    {element.name}
                  </span>
                </NavLink>
              )
          )}
        </nav>
        {isLogin && (
          <div className="px-4 pb-4">
            <Button
              onClick={handleLogout}
              className={`relative w-full px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                text-gray-300 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 hover:bg-linear-to-r hover:from-cyan-500/10 hover:to-purple-500/10
                before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-cyan-500/0 before:via-purple-500/0 before:to-cyan-500/0 
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-cyan-500/20 
                after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] active:scale-95`}
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="absolute left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                Sign out
              </span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
