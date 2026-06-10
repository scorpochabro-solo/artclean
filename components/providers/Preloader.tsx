"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Drop } from "@/components/ui/Drop";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Прелоадер: капля «наполняется» снизу вверх и растворяется.
 * Показывается один раз за сессию; отключён при prefers-reduced-motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (sessionStorage.getItem("ac-preloaded")) return;
    setShow(true);
    sessionStorage.setItem("ac-preloaded", "1");
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-milk-100"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="relative h-16 w-[46px]">
            <Drop className="absolute inset-0 h-full w-full text-milk-200" />
            <motion.div
              className="absolute inset-x-0 bottom-0 overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              <div className="absolute inset-x-0 bottom-0 h-16 w-[46px]">
                <Drop className="h-full w-full text-ink-900" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
