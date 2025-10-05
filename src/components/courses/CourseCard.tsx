"use client"

import React from 'react';
import { BookOpen, Calendar, Award, Network } from "lucide-react";
import { motion } from "framer-motion";

interface CourseData {
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
  course: CourseData;
  onClick: (course: CourseData) => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const getYearLabel = (year: string): string => {
    const labels: { [key: string]: string } = { "א": "שנה א׳", "ב": "שנה ב׳", "ג": "שנה ג׳", "ד": "שנה ד׳" };
    return labels[year] || `שנה ${year}`;
  };

  const getTypeColor = (mandatory: boolean): string => {
    return mandatory 
      ? "bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800 border-purple-200" 
      : "bg-gradient-to-r from-blue-200 to-teal-200 text-teal-800 border-teal-200";
  };

  const getTypeLabel = (mandatory: boolean): string => {
    return mandatory ? "חובה" : "בחירה";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={() => onClick(course)}
      className="cursor-pointer p-5 rounded-[20px] transition-all duration-300 bg-white/80 backdrop-blur-sm"
      style={{
        boxShadow: '6px 6px 16px rgba(0,0,0,0.08), -6px -6px 16px rgba(255,255,255,0.9), inset 2px 2px 6px rgba(255,255,255,0.5)'
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">
            {course.name}
          </h3>
          <p className="text-xs text-gray-500">{course.id}</p>
        </div>
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center ml-2 flex-shrink-0"
             style={{
               background: 'linear-gradient(145deg, #A8E6CF, #B3E5FC)',
               boxShadow: '3px 3px 8px rgba(0,0,0,0.08), -3px -3px 8px rgba(255,255,255,0.8)'
             }}>
          <BookOpen className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span 
          className={`${getTypeColor(course.mandatory)} rounded-full px-2.5 py-0.5 border text-xs font-medium`}
          style={{
            boxShadow: '2px 2px 6px rgba(0,0,0,0.05), inset 1px 1px 3px rgba(255,255,255,0.5)'
          }}
        >
          {getTypeLabel(course.mandatory)}
        </span>
        <span 
          className="rounded-full px-2.5 py-0.5 bg-white/70 border-gray-200 text-xs border"
          style={{
            boxShadow: '2px 2px 6px rgba(0,0,0,0.05), inset 1px 1px 3px rgba(255,255,255,0.5)'
          }}
        >
          <Calendar className="w-3 h-3 ml-1 inline" />
          סמסטר {course.semester}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Award className="w-3.5 h-3.5" />
          <span className="font-medium">{course.credits} נ&quot;ז</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600">
          <span>{getYearLabel(course.year)}</span>
        </div>
      </div>

      {course.prerequisites && course.prerequisites.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200/50">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Network className="w-3 h-3" />
            <span>{course.prerequisites.length} דרישות קדם</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}