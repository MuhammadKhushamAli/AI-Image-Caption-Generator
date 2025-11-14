import { forwardRef, useId } from "react";

export const Input = forwardRef(({
    type = "text",
    label,
    className,
    ...props
}, ref
) => {
    const id = useId();
    return (
        <div className="relative group">
            <label 
                htmlFor={id}
                className="block text-sm font-semibold text-cyan-400 mb-2 uppercase tracking-wider"
            >
                {label}
            </label>
            <div className="relative">
                <input 
                    type={type} 
                    id={id} 
                    className={`w-full px-4 py-3.5 bg-slate-800/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg
                        text-gray-200 placeholder-gray-500
                        focus:outline-none focus:border-cyan-400/70 focus:bg-slate-800/80
                        focus:shadow-[0_0_20px_rgba(0,255,255,0.2)] focus:ring-2 focus:ring-cyan-500/20
                        transition-all duration-300
                        ${className || ''}`}
                    {...props} 
                    ref={ref} 
                />
                {/* Animated border glow on focus */}
                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 
                    opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm"></div>
            </div>
        </div>
    )
}) 