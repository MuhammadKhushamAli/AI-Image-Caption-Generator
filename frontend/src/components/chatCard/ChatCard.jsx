import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axios.js";
import { Container } from "../container/Container.jsx";
import { Error } from "../Error.jsx";
import { useSelector } from "react-redux";
import { MainLoading } from "../MainLoading.jsx";
import { Link } from "react-router-dom";

export function ChatCard() {
  const [error, setError] = useState("");
  const { chatId } = useParams();
  const [chat, setChat] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isLogin = useSelector((state) => state?.auth?.loginStatus);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChat = async () => {
      setError("");
      setIsLoading(true);
      try {
        const chatResponse = await axiosInstance.get(
          isLogin
            ? `/api/v1/chat/view-chat/${chatId}`
            : `/api/v1/chat/view-chat-guest/${chatId}`
        );
        if (chatResponse?.status === 200) {
          console.log(chatResponse);
          setChat(chatResponse?.data);
        } else {
          setError(chatResponse?.message);
        }
      } catch (err) {
        setError(err?.message || "Failed to load chat");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChat();
  }, [chatId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {error && <Error error={error} />}
      {isLoading ? (
        <MainLoading />
      ) : (
        <>
          <div className="max-w-4xl mx-auto">
            {/* --- ADDED GO BACK BUTTON --- */}
            <div className="mb-6 relative z-10">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
                className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group
                       text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 
                       bg-slate-900/70 backdrop-blur-sm hover:bg-slate-800/50
                       shadow-lg shadow-cyan-900/5 ring-1 ring-white/5 active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Go Back
              </Link>
            </div>
            {/* --- END GO BACK BUTTON --- */}

            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 blur-2xl rounded-full opacity-50"></div>
                <h1 className="relative text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Chat Details
                </h1>
              </div>
            </div>

            {/* Chat Messages Container */}
            <div className="space-y-6">
              {/* User Message - Image on the Right */}
              {chat?.image && (
                <div className="flex justify-end items-start gap-3 group">
                  <div className="flex flex-col items-end max-w-[75%] sm:max-w-[60%]">
                    {/* Message Bubble */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative backdrop-blur-xl bg-linear-to-br from-cyan-500/20 via-purple-500/20 to-cyan-500/20 border border-cyan-400/50 rounded-2xl p-3 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                        <div className="rounded-xl overflow-hidden border border-cyan-400/30">
                          <img
                            src={chat.image}
                            alt={chat?.name || "User image"}
                            className="w-full h-auto max-h-96 object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Timestamp */}
                    {chat?.createdAt && (
                      <span className="text-xs text-gray-500 mt-1 px-2">
                        {formatDate(chat.createdAt)}
                      </span>
                    )}
                  </div>

                  {/* User Avatar */}
                  <div className="shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/30 to-purple-500/30 blur-lg rounded-full opacity-50"></div>
                      <div className="relative w-10 h-10 rounded-full bg-linear-to-br from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400/50 flex items-center justify-center backdrop-blur-sm">
                        <svg
                          className="w-6 h-6 text-cyan-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bot Message - Caption on the Left */}
              {chat?.caption && (
                <div className="flex justify-start items-start gap-3 group">
                  {/* Bot Avatar */}
                  <div className="shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-purple-500/30 to-cyan-500/30 blur-lg rounded-full opacity-50"></div>
                      <div className="relative w-10 h-10 rounded-full bg-linear-to-br from-purple-500/30 to-cyan-500/30 border-2 border-purple-400/50 flex items-center justify-center backdrop-blur-sm">
                        <svg
                          className="w-6 h-6 text-purple-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start max-w-[75%] sm:max-w-[60%]">
                    {/* Message Bubble */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-800/90 via-purple-900/70 to-slate-800/90 border border-purple-400/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-purple-400 shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                          </svg>
                          <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                            {chat.caption}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timestamp */}
                    {chat?.createdAt && (
                      <span className="text-xs text-gray-500 mt-1 px-2">
                        {formatDate(chat.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!chat?.image && !chat?.caption && (
                <div className="text-center py-12">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-full opacity-50"></div>
                    <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                      <svg
                        className="w-16 h-16 text-cyan-400 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <p className="text-gray-400">No chat content available</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
