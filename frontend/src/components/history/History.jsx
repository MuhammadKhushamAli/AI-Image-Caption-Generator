import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../axios/axios.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Container } from "../container/Container.jsx";
import { HistoryCard } from "./HIstoryCard.jsx";
import { Error } from "../Error.jsx";

export function History() {
  const [error, setError] = useState("");
  const [userHistory, setUserHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const isNextPage = useRef(false);
  const isLoggedIn = useSelector((state) => state?.auth?.loginStatus);
  const userData = useSelector((state) => state?.auth?.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      setError("");
      try {
        console.log(isLoggedIn);
        if (isLoggedIn) {
          const historyResponse = await axiosInstance.get(
            "/api/v1/users/user-history",
            {
              params: { userName: userData?.userName, page: currentPage },
            }
          );
          if (historyResponse?.status === 200) {
            setError(historyResponse?.message);
            const newHistory = historyResponse?.data?.docs?.[0]?.history || [];
            setUserHistory((prev) => [...prev, ...newHistory]);
            isNextPage.current = historyResponse?.data?.hasNextPage;
          } else {
            setError(historyResponse?.response?.message);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [currentPage, isLoggedIn, userData?.userName, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (isNextPage.current) {
        if (
          window.innerHeight + window.scrollY >=
          document.body?.offsetHeight - 50
        ) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-linear-to-tr from-cyan-900/30 via-purple-900/20 to-slate-900/30 blur-[140px] rounded-full pointer-events-none opacity-30"></div>

      {error && <Error error={error} />}

      {/* Header Section */}
      <div className="text-center mb-12 sm:mb-16 relative z-10">
        <div className="relative inline-block mb-4 group">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/40 via-purple-500/40 to-cyan-500/40 blur-2xl rounded-full opacity-50 animate-pulse group-hover:opacity-75 transition-opacity duration-500"></div>
          <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-cyan-200 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            Analysis History
          </h1>
        </div>
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto tracking-wide border-b border-slate-800/50 pb-8">
          Browse through all your analyzed images and captions
        </p>
      </div>

      {/* History Cards Grid */}
      {userHistory.length > 0 ? (
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {userHistory.map((chat) => (
              <HistoryCard
                key={chat._id}
                imageURL={chat.image}
                id={chat._id}
                caption={chat.caption}
              />
            ))}
          </div>

          {/* Loading indicator for infinite scroll */}
          {(isLoading || isNextPage.current) && (
            <div className="mt-12 flex justify-center">
              <div className="relative">
                {/* Outer glow effect */}
                <div className="absolute -inset-2 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-full opacity-50 animate-pulse"></div>

                {/* Loading ring container - Glassy Card */}
                <div className="relative backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-cyan-900/10 ring-1 ring-white/5">
                  <div className="flex flex-col items-center gap-4">
                    {/* Animated loading ring */}
                    <div className="relative w-16 h-16">
                      {/* Outer ring */}
                      <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
                      {/* Animated ring */}
                      <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
                      {/* Inner glow */}
                      <div className="absolute inset-2 bg-linear-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-sm"></div>
                      {/* Center dot */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>

                    {/* Loading text */}
                    <div className="text-center">
                      <p className="text-cyan-300 text-sm font-medium mb-1">
                        Loading more cards
                      </p>
                      <p className="text-slate-500 text-xs">Please wait...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="relative">
            <div className="absolute -inset-2 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-50"></div>
            {/* Empty State Glassy Card */}
            <div className="relative backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-2xl p-12 shadow-2xl shadow-cyan-900/10 ring-1 ring-white/5">
              <div className="mb-8 flex justify-center">
                <div className="p-6 rounded-full bg-slate-800/50 border-2 border-slate-700 shadow-lg">
                  <div className="animate-[float_3s_ease-in-out_infinite]">
                    <svg
                      className="w-16 h-16 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                No History Yet
              </h2>
              <p className="text-slate-400 mb-8 tracking-wide">
                Start analyzing images to see your history here
              </p>
              <button
                onClick={() => navigate("/")}
                className="relative px-8 py-3.5 text-base font-semibold rounded-lg transition-all duration-300 group overflow-hidden
              text-white bg-slate-800/60 border border-cyan-500/30 
              hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20
              hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-[0.98]"
              >
                {/* Shimmer Effect */}
                <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {/* Corrected this part: Removed nested <Link> tag. The button's onClick already handles navigation. */}
                  Start Analyzing
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframes needed for animations */}
      <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}</style>
    </Container>
  );
}
