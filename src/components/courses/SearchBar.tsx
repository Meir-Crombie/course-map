"use client"

import React from 'react';
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <div 
        className="rounded-[20px] overflow-hidden bg-white/90 backdrop-blur-sm"
        style={{
          boxShadow: '6px 6px 16px rgba(0,0,0,0.08), -6px -6px 16px rgba(255,255,255,0.9), inset 2px 2px 6px rgba(255,255,255,0.5)'
        }}
      >
        <div className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="חפש קורס לפי שם או קוד..."
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            className="w-full pr-12 pl-4 py-5 text-base border-none bg-transparent focus:outline-none focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
}