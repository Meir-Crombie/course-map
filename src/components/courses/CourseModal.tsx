import React from "react";
import { X, BookOpen, Calendar, Award, Network } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CourseType {
  id: string;
  name: string;
  credits: number;
  semester: string;
  year: string;
  mandatory: boolean;
  prerequisites?: string[];
  description: string;
}

interface CourseModalProps {
  course: CourseType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[24px] p-8 z-50"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Course Header */}
            <div className="mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(145deg, #A8E6CF, #B3E5FC)'
                  }}
                >
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 leading-tight">
                    {course.name}
                  </h2>
                  <p className="text-sm text-gray-500">קוד: {course.id}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.mandatory
                      ? "bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800"
                      : "bg-gradient-to-r from-blue-200 to-teal-200 text-blue-800"
                  }`}
                >
                  {course.mandatory ? "חובה" : "בחירה"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {course.credits} נ״ז
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  סמסטר {course.semester}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                  שנה {course.year === "א" ? "א'" : course.year === "ב" ? "ב'" : "ג'"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">תיאור הקורס</h3>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  קדמים
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.prerequisites.map((prereq: string) => (
                    <span
                      key={prereq}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700"
                    >
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
