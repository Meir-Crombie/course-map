"use client"
import { motion } from "framer-motion"
import { Calendar, User, CheckCircle, XCircle } from "lucide-react"

interface Course {
  id: string
  name: string
  credits: number
  semester: string
  year: string
  mandatory: boolean
  prerequisites: string[]
  corequisites?: string[]
  requiredKnowledge?: string[]
  alternativePrerequisites?: string
  notes?: string
  description: string
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
                <span className="text-sm text-gray-600">נקודות זכות</span>
                <p className="font-medium text-gray-800">{course.credits} נ״ז</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg">
              <Calendar className="w-5 h-5 text-secondary" />
              <div>
                <span className="text-sm text-gray-600">סמסטר ושנה</span>
                <p className="font-medium text-gray-800">סמסטר {course.semester}, שנה {course.year}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg">
              {course.mandatory ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              <div>
                <span className="text-sm text-gray-600">סוג הקורס</span>
                <p className="font-medium text-gray-800">
                  {course.mandatory ? "חובה" : "בחירה"}
                </p>
              </div>
            </div>

            {course.prerequisites && course.prerequisites.length > 0 && (
              <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <span className="text-sm text-gray-600">קורסי קדם</span>
                  <p className="font-medium text-gray-800">{course.prerequisites.length} קורסים</p>
                </div>
              </div>
            )}

            {course.notes && (
              <div className="p-3 bg-yellow-50/50 rounded-lg border border-yellow-200">
                <span className="text-sm text-gray-600 block mb-1">הערות</span>
                <p className="text-xs text-gray-700">{course.notes}</p>
              </div>
            )}
          </div>

          <div className="flex items-start justify-center md:justify-end">
            <div className="w-full max-w-xs">
              {course.alternativePrerequisites && (
                <div className="mb-4 p-3 bg-blue-50/50 rounded-lg">
                  <span className="text-sm text-gray-600 block mb-1">דרישות קדם חלופיות</span>
                  <p className="text-xs text-gray-700">{course.alternativePrerequisites}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}