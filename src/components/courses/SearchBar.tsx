import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl">
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      <input
        type="text"
        placeholder="חפש לפי שם קורס, קוד או תיאור..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pr-12 pl-6 py-3 md:py-4 rounded-[20px] transition-all text-right shadow-md focus:shadow-lg focus:ring-2 focus:ring-purple-300 focus:outline-none bg-white/90 backdrop-blur-sm text-sm md:text-base"
      />
    </div>
  );
}
