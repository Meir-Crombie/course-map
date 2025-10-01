import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white/80 backdrop-blur-md shadow-md mt-12"
    >
      <div className="max-w-6xl mx-auto py-6 px-6 text-center text-gray-500 text-sm">
        © 2025 CourseMap
      </div>
    </motion.footer>
  );
}
