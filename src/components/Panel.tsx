import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface PanelProps {
  title?: string;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  width?: string;
}

export default function Panel({ title, onClose, children, className = "", width = "max-w-3xl" }: PanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className={`pointer-events-auto relative ${width} max-h-[78vh] overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-slate-900/80 to-slate-950/85 shadow-2xl backdrop-blur-2xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/8 to-transparent" />
      {title && (
        <div className="relative flex items-center justify-between border-b border-white/8 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}
      <div className="relative max-h-[calc(78vh-64px)] overflow-y-auto px-6 py-5 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15">
        {children}
      </div>
    </motion.div>
  );
}
