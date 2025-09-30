"use client"
import { motion } from "framer-motion"
import { ExternalLink, Calendar, User, CheckCircle, XCircle } from "lucide-react"

interface Course {
  id: string
  name: string
  syllabus: string
  mandatoryAttendance: boolean
  coordinator: string
  description?: string
}

interface CourseInfoCardProps {
  course: Course
}

export default function CourseInfoCard({ course }: CourseInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/20 backdrop-blur-lg rounded-2xl p-8" style={{boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--color-bg-card)'}}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-4">{course.name}</h1>
          {course.description && (
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg">
              <User className="w-5 h-5 text-secondary" />
              <div>
                <span className="text-sm text-gray-600">Coordinator</span>
                <p className="font-medium text-gray-800">{course.coordinator}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg">
              {course.mandatoryAttendance ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              <div>
                <span className="text-sm text-gray-600">Attendance</span>
                <p className="font-medium text-gray-800">
                  {course.mandatoryAttendance ? "Mandatory" : "Optional"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-center md:justify-end">
            <motion.a
              href={course.syllabus}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="w-5 h-5" />
              View Syllabus
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}