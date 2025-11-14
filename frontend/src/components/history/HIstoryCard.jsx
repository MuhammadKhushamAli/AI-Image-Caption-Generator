import { Link } from "react-router-dom";

export function HistoryCard({ imageURL, caption, id }) {
  return (
    <Link to={`/chat/${id}`} className="block group">
      <div className="relative">
        {/* Background glow on hover */}
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Card container */}
        <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-300 hover:border-cyan-400/50 hover:scale-[1.02] overflow-hidden">
          {/* Image container */}
          <div className="relative mb-4 rounded-xl overflow-hidden border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors duration-300">
            <img 
              src={imageURL} 
              alt="Image of Caption" 
              className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-linear-to-t from-cyan-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Caption */}
          <div className="relative">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <p className="text-gray-300 text-sm sm:text-base line-clamp-3 group-hover:text-cyan-200 transition-colors duration-300">
                {caption}
              </p>
            </div>
            
            {/* View details hint */}
            <div className="mt-3 flex items-center gap-2 text-cyan-400/0 group-hover:text-cyan-400 transition-colors duration-300">
              <span className="text-xs font-medium">View Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
