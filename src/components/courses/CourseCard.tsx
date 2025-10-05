import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Award, Network } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  semester: string;
  year: string;
  mandatory: boolean;
  prerequisites?: string[];
  description: string;
}

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const yearLabel = course.year === "א" ? "שנה א'" : course.year === "ב" ? "שנה ב'" : "שנה ג'";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative bg-white/90 backdrop-blur-sm rounded-[20px] p-5 transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: '6px 6px 16px rgba(0,0,0,0.08), -6px -6px 16px rgba(255,255,255,0.9), inset 2px 2px 6px rgba(255,255,255,0.5)'
      }}
    >
      {/* Header with Icon */}
      <div className="flex items-start gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(145deg, #A8E6CF, #B3E5FC)'
          }}
        >
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-base leading-tight line-clamp-2 mb-1">
            {course.name}
          </h3>
          <p className="text-xs text-gray-500">קוד: {course.id}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          course.mandatory 
            ? 'bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800' 
            : 'bg-gradient-to-r from-blue-200 to-teal-200 text-blue-800'
        }`}>
          {course.mandatory ? 'חובה' : 'בחירה'}
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
          <Award className="w-3 h-3" />
          {course.credits} נ״ז
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1.5 text-xs text-gray-600 mb-3">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>סמסטר {course.semester} • {yearLabel}</span>
        </div>
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-gray-400" />
            <span>{course.prerequisites.length} קדמים</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {course.description}
      </p>
    </motion.div>
  );
}
