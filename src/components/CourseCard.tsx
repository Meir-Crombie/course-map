"use client"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CourseCardProps {
  course: {
    id: string
    name: string
    description: string
    credits: number
    semester: string
    year: string
    mandatory: boolean
    prerequisites: string[]
    notes?: string
  }
  index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)"
      }}
      className="h-full"
    >
      <div 
        className="rounded-2xl p-6 transition-all duration-300 flex flex-col"
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          backgroundColor: "var(--color-bg-card)",
          minHeight: "380px",
          maxHeight: "380px",
          overflow: "hidden"
        }}
      >
        {/* 1. Status Badge - למעלה */}
        <div className="flex justify-end mb-3">
          <span 
            className="px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: course.mandatory ? "#3B82F6" : "#10B981",
              color: "white"
            }}
          >
            {course.mandatory ? 'חובה' : 'רשות'}
          </span>
        </div>

        {/* 2. Course Title */}
        <h3 
          className="text-xl font-semibold mb-3 line-clamp-2"
          style={{
            color: "var(--color-text-primary)",
            lineHeight: "1.3"
          }}
        >
          {course.name}
        </h3>

        {/* 3. Course Metadata - נ"ז, חובה/רשות, סמסטר, שנה */}
        <div 
          className="text-sm mb-3 space-y-1"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: "#4B5563" }}>נ״ז:</span>
            <span>{course.credits}</span>
            <span style={{ color: "#D1D5DB" }}>|</span>
            <span>{course.mandatory ? 'חובה' : 'רשות'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: "#4B5563" }}>סמסטר:</span>
            <span>{course.semester}</span>
            <span style={{ color: "#D1D5DB" }}>|</span>
            <span className="font-semibold" style={{ color: "#4B5563" }}>שנה:</span>
            <span>{course.year}</span>
          </div>
        </div>

        {/* 4. Description - תופס את המקום הנותר */}
        <p 
          className="text-sm mb-4 line-clamp-4 flex-grow"
          style={{
            color: "var(--color-text-secondary)",
            lineHeight: "1.6"
          }}
        >
          {course.description}
        </p>

        {/* 5. Button - תמיד בתחתית */}
        <div className="mt-auto">
          <Link href={`/courses/${course.id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center text-sm"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)"
              }}
            >
              <span>פרטים נוספים</span>
              <ArrowLeft className="w-4 h-4 mr-2" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}