import { Link } from "react-router-dom";
import { axiosInstance } from "../../axios/axios.js";
import { useState, useCallback } from "react";

export function HistoryCard({ imageURL, caption, id }) {
  const [error, setError] = useState("");

  const onDelete = useCallback(async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/chat/delete-chat/${id}`
      );
      if (response?.status === 200) {
        setError(response?.message);;
      }
    } catch (error) {
      setError(error?.message);
    }
  }, [id]);
  return (
    <Link to={`/chat/${id}`} className="block group">
      <div className="relative">
        {/* Background glow on hover */}
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Card container - Refined Glassy Style */}
        <div
          className="relative backdrop-blur-xl bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl shadow-cyan-900/10 ring-1 ring-white/5 
                 transition-all duration-300 
                 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] group-hover:border-cyan-500/30 group-hover:scale-[1.02] overflow-hidden"
        >
          {/* --- ADDED DELETE BUTTON --- */}
          <button
            type="button"
            onClick={onDelete}
            // This button is styled to match the theme.
            className="absolute top-4 right-4 z-10 p-1.5 rounded-lg 
                   bg-slate-800/60 backdrop-blur-sm border border-white/10
                   text-slate-400 hover:text-red-400 hover:border-red-400/50
                   opacity-50 group-hover:opacity-100 
                   transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m6-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
          {/* --- END DELETE BUTTON --- */}

          {/* Image container */}
          <div className="relative mb-4 rounded-xl overflow-hidden border border-white/10 group-hover:border-cyan-500/40 transition-colors duration-300 shadow-lg">
            <img
              src={imageURL}
              alt="Image of Caption"
              className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay gradient on hover - STYLE FIX: Made gradient visible */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Caption */}
          <div className="relative">
            <div className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5"
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
              <p className="text-slate-300 text-sm sm:text-base line-clamp-3 group-hover:text-cyan-200 transition-colors duration-300">
                {caption}
              </p>
            </div>

            {/* View details hint - This effect is great, no changes needed */}
            <div className="mt-4 flex items-center gap-2 text-cyan-400/0 group-hover:text-cyan-400 transition-all duration-300 ease-in-out group-hover:translate-x-1">
              <span className="text-xs font-medium">View Details</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
