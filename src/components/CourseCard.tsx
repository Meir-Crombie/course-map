"use client"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen } from "lucide-react"
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
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
      }}
      className="h-full"
    >
      <div 
        className="rounded-2xl p-6 transition-all duration-300 flex flex-col h-full"
        style={{
          background: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          minHeight: "400px",
          maxHeight: "400px"
        }}
      >
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-blue-50">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <span 
            className="px-4 py-1.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: course.mandatory ? "#3B82F6" : "#10B981",
              color: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            {course.mandatory ? 'חובה' : 'רשות'}
          </span>
        </div>

        {/* Course Title */}
        <h3 
          className="text-xl font-bold mb-3 line-clamp-2"
          style={{
            color: "#1F2937",
            lineHeight: "1.3"
          }}
        >
          {course.name}
        </h3>

        {/* Metadata */}
        <div className="mb-3 space-y-2">
          <div 
            className="flex items-center justify-between px-3 py-2 rounded-lg"
            style={{ backgroundColor: "#F0F4F8" }}
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-700">נ״ז:</span>
              <span className="font-bold text-blue-600">{course.credits}</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div className="text-sm text-gray-600">
              {course.mandatory ? 'חובה' : 'רשות'}
            </div>
          </div>
          
          <div 
            className="flex items-center justify-between px-3 py-2 rounded-lg"
            style={{ backgroundColor: "#F0F4F8" }}
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-700">סמסטר:</span>
              <span className="text-gray-900">{course.semester}</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-700">שנה:</span>
              <span className="text-gray-900">{course.year}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p 
          className="text-sm mb-4 line-clamp-3 flex-grow"
          style={{
            color: "#6B7280",
            lineHeight: "1.6"
          }}
        >
          {course.description}
        </p>

        {/* Button */}
        <div className="mt-auto">
          <Link href={`/courses/${course.id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center text-sm group"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
              }}
            >
              <span>פרטים נוספים</span>
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}