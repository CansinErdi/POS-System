import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
  // lock scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* panel */}
          <motion.div
            className="absolute inset-0 flex items-start md:items-center justify-center p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
              <div className="px-5 py-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="p-5">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}