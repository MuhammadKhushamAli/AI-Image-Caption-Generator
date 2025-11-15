import React from 'react'; // Make sure to import React

export function Container({ children, className = "" }) {

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse x position relative to element
    const y = e.clientY - rect.top;  // Mouse y position relative to element

    // Set CSS custom properties (variables) on the element
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const mouseFollowEffect = [
    "before:content-['']",
    "before:absolute",
    "before:inset-0",
    "before:rounded-xl",
    "before:opacity-0", // Hidden by default
    "hover:before:opacity-100", // Fades in on hover
    "before:transition-opacity",
    "before:duration-300",
    "before:bg-[radial-gradient(350px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(59,130,246,0.25),_transparent_80%)]",
  ].join(" ");

  return (
    <div
      className={`p-8 rounded-xl bg-linear-to-br from-slate-900 to-blue-950 text-slate-100 border border-blue-800/50 shadow-xl shadow-blue-950/30 relative overflow-hidden ${mouseFollowEffect} ${className}`}
      onMouseMove={handleMouseMove} // This JS prop runs the function
    >
      {children}
    </div>
  );
}