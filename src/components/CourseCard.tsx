"use client"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, User } from "lucide-react"
import Link from "next/link"

interface CourseCardProps {
  course: {
    id: string
    name: string
    description?: string
    coordinator: string
    mandatoryAttendance: boolean
  }
  index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
            course.mandatoryAttendance 
              ? 'bg-red-50 text-red-700 border-red-200' 
              : 'bg-green-50 text-green-700 border-green-200'
          }`}>
            {course.mandatoryAttendance ? 'נוכחות חובה' : 'נוכחות רשות'}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-900 transition-colors">
            {course.name}
          </h3>
          
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {course.description || 'קורס מתקדם המיועד לסטודנטים עם רקע בסיסי בתחום. הקורס כולל הרצאות, תרגילים מעשיים ופרויקט גמר.'}
          </p>

          <div className="flex items-center text-gray-600 text-sm mb-6 bg-blue-50 p-2 rounded-lg">
            <User className="w-4 h-4 ml-2 text-blue-600" />
            <span>רכז: {course.coordinator}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/courses/${course.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg"
          >
            <span>צפה בפרטים</span>
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}