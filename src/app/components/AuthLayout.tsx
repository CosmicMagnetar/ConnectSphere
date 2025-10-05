import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-purple-950 opacity-50"></div>

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Floating gradient circles */}
      <div
        className="absolute top-20 right-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10 animate-pulse"
        style={{ animationDuration: "5s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse"
        style={{ animationDuration: "6s" }}
      ></div>

      {/* Content */}
      <div className="w-full max-w-md relative z-10">{children}</div>
    </div>
  );
}
