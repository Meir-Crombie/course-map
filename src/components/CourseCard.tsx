"use client"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Tag, Calendar, Clock } from "lucide-react" 
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
  const isMandatory = course.mandatory
  
  // הגדרות סגנון מתוך משתני ה-CSS
  const statusColor = isMandatory 
    ? "var(--color-mandatory)" 
    : "var(--color-optional)"  
  
  const statusBg = isMandatory 
    ? "rgba(239, 68, 68, 0.1)" 
    : "rgba(16, 185, 129, 0.1)" 

  const mainIconColor = "text-blue-600" // נשאר כקלאס ברירת מחדל של טיילווינד

  return (
    <Link 
      href={`/courses/${course.id}`} 
      className="h-full block group course-card"
    >
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.07, ease: "easeOut" }}
        whileHover={{
          y: -6,
          boxShadow: "var(--shadow-card)", 
        }}
        className="bg-white rounded-3xl p-7 transition-all duration-300 flex flex-col border border-gray-100 hover:border-gray-200"
        style={{
          minHeight: "100%", 
          maxHeight: "100%",
          boxShadow: "var(--shadow-sm)", 
        }}
        dir="rtl" // הגדרה גורפת לכיווניות מימין לשמאל
      >
        {/* TOP SECTION: Icon, Badge, and Title */}
        <div className="flex justify-between items-start mb-4">
          {/* Main Icon - שימוש במשתנה primary מה-CSS */}
          <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(56, 128, 245, 0.1)' }}>
            <BookOpen className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          
          {/* Badge (חובה/רשות) */}
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full`}
            style={{ backgroundColor: statusBg, color: statusColor }}
          >
            {isMandatory ? "חובה" : "רשות"}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-2xl font-extrabold mb-1 leading-tight line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
          {course.name}
        </h3>
        
        <p className="text-sm line-clamp-2 mb-5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {course.description || "תיאור קצר לא זמין. אנא בדוק את פרטי הקורס המלאים למידע נוסף."}
        </p>

        {/* INFO BLOCKS: Semester and Year (שומרים על סידור Flexbox נקי) */}
        <div className="mb-5 mt-2 space-y-2">
          {/* סמסטר */}
          <div className="flex items-center text-sm px-3 py-1">
            <Clock className="w-4 h-4 ml-2 text-amber-500" /> 
            <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>סמסטר:</span>
            <span className="mr-auto font-bold text-left" style={{ color: 'var(--color-text-primary)' }}>{course.semester}</span> 
          </div>

          {/* שנה */}
          <div className="flex items-center text-sm px-3 py-1">
            <Calendar className="w-4 h-4 ml-2 text-indigo-500" />
            <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>שנה:</span>
            <span className="mr-auto font-bold text-left" style={{ color: 'var(--color-text-primary)' }}>{course.year}</span>
          </div>
        </div>

        {/* Technical Data (נ״ז + קוד) - סידור סופי עם קלאסים גלובליים */}
        <div className="grid grid-cols-2 gap-3 mb-5 pt-4 mt-auto border-t" style={{ borderColor: 'var(--color-bg-main)' }}>
          
          {/* נ״ז */}
          <div className="flex items-center justify-start text-xs px-3 py-2 rounded-xl" style={{ backgroundColor: 'var(--color-bg-main)' }}>
            <Tag className={`w-4 h-4 ml-2`} style={{ color: statusColor }} />
            <span className="data-label" style={{ color: 'var(--color-text-secondary)' }}>נ״ז:</span>
            <span className="data-value" style={{ color: 'var(--color-text-primary)' }}>{course.credits}</span>
          </div>

          {/* קוד קורס */}
          <div className="flex items-center justify-start text-xs px-3 py-2 rounded-xl" style={{ backgroundColor: 'var(--color-bg-main)' }}>
            <span className="data-label" style={{ color: 'var(--color-text-secondary)' }}>קוד:</span>
            <span className="data-value font-mono" style={{ color: 'var(--color-text-primary)' }}>{course.id}</span>
          </div>
        </div>
        
        {/* Footer Link (חץ אלגנטי) */}
        <div className="mt-2 flex items-center justify-between font-bold transition-colors group-hover:opacity-90" style={{ color: 'var(--color-primary)' }}>
          <span>פרטים נוספים</span>
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" /> 
        </div>
      </motion.article>
    </Link>
  )
}