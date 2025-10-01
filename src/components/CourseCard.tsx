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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
      }}
      className="group h-full"
    >
      <div className="rounded-2xl p-6 transition-all duration-300 h-full flex flex-col" style={{boxShadow: "var(--shadow-card)", backgroundColor: "var(--color-bg-card)"}}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3 flex-shrink-0">
          <div className="p-2 rounded-xl transition-colors" style={{backgroundColor: "rgba(56, 128, 245, 0.1)"}}>
            <BookOpen className="w-5 h-5" style={{color: "var(--color-primary)"}} />
          </div>
          <div 
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: course.mandatory ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
              color: course.mandatory ? "var(--color-mandatory)" : "var(--color-optional)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            {course.mandatory ? 'חובה' : 'בחירה'}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-between min-h-0">
          <div>
            <h3 className="text-lg font-bold mb-2 transition-colors line-clamp-2" style={{color: "var(--color-text-primary)"}}>
              {course.name}
            </h3>
            
            <p className="text-xs mb-2 leading-relaxed line-clamp-3" style={{color: "var(--color-text-secondary)"}}>
              {course.description}
            </p>

            <div className="flex items-center justify-between text-xs mb-2 p-1.5 rounded-lg" style={{color: "var(--color-text-secondary)", backgroundColor: "rgba(56, 128, 245, 0.05)"}}>
              <span className="font-semibold">{course.credits} נ״ז</span>
              <span>•</span>
              <span>סמסטר {course.semester}</span>
              <span>•</span>
              <span>שנה {course.year}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0 mt-2">
            <Link href={`/courses/${course.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="modern-button w-full text-white font-semibold py-2.5 px-4 transition-all duration-300 flex items-center justify-center text-sm"
              >
                <span className="relative z-10">View Details</span>
                <ArrowLeft className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}