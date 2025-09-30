"use client"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = "חפש קורס..." }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full px-6 py-4 pr-12 text-lg rounded-2xl border-2 transition-all duration-300 outline-none
            bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500
            ${isFocused 
              ? 'border-blue-400 shadow-lg shadow-blue-100 ring-4 ring-blue-50' 
              : 'border-blue-200 hover:border-blue-300'
            }
          `}
        />
      </div>
    </motion.form>
  )
}