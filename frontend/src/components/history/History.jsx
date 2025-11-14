import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../axios/axios.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Container } from "../container/Container.jsx";
import { HistoryCard } from "./HIstoryCard.jsx";
import { Link } from "react-router-dom";
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
        if (isLoggedIn) {
          const historyResponse = await axiosInstance.get("/api/v1/users/user-history", {
            params: { userName: userData?.userName, page: currentPage },
          });
          if (historyResponse?.status === 200) {
            setError(historyResponse?.data?.message);
            const newHistory = historyResponse?.data?.data?.docs?.[0]?.history || [];
            setUserHistory((prev) => [
              ...prev,
              ...newHistory,
            ]);
            isNextPage.current = historyResponse?.data?.data?.hasNextPage;
          } else {
            setError(historyResponse?.response?.data?.message);
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
    <Container className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {error && <Error error={error} />}
      
      {/* Header Section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 blur-2xl rounded-full opacity-50"></div>
          <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Analysis History
          </h1>
        </div>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Browse through all your analyzed images and captions
        </p>
      </div>

      {/* History Cards Grid */}
      {userHistory.length > 0 ? (
        <div className="max-w-7xl mx-auto">
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
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-full opacity-50 animate-pulse"></div>
                
                {/* Loading ring container */}
                <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,255,255,0.15)]">
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
                      <p className="text-cyan-300 text-sm font-medium mb-1">Loading more cards</p>
                      <p className="text-gray-500 text-xs">Please wait...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-50"></div>
            <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-12 shadow-[0_0_50px_rgba(0,255,255,0.15)]">
              <div className="mb-6 flex justify-center">
                <div className="p-6 rounded-2xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30">
                  <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
                No History Yet
              </h2>
              <p className="text-gray-400 mb-6">
                Start analyzing images to see your history here
              </p>
              <button
                onClick={() => navigate("/")}
                className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                  text-gray-100 bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 
                  hover:text-cyan-300 hover:border-cyan-400/70 hover:bg-linear-to-r hover:from-cyan-500/30 hover:to-purple-500/30
                  before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-cyan-500/0 before:via-purple-500/0 before:to-cyan-500/0 
                  before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                  after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-cyan-500/20 
                  after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                  hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <Link to="/">Start Analyzing</Link>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
