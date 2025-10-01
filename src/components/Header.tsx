import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Map", href: "/map" },
  { name: "News", href: "/news" },
];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/globe.svg" alt="CourseMap Logo" width={32} height={32} />
          <span className="text-xl font-bold text-blue-700 tracking-tight">CourseMap</span>
        </Link>
        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link text-base font-medium px-3 py-2 rounded-lg transition-colors hover:bg-blue-100 hover:text-blue-700"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
