"use client"

import React from 'react';
import { BookOpen, Calendar, Award, Network, Clock } from "lucide-react";
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

  const getTypeLabel = (mandatory: boolean): string => {
    return mandatory ? "חובה" : "בחירה";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onClick(course)}
      className="cursor-pointer p-6 rounded-[24px] transition-all duration-300 bg-white/90 backdrop-blur-sm flex flex-col h-full"
      style={{
        boxShadow: '8px 8px 20px rgba(0,0,0,0.06), -8px -8px 20px rgba(255,255,255,0.9), inset 3px 3px 8px rgba(255,255,255,0.6)'
      }}
      dir="rtl"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-3 flex-shrink-0"
             style={{
               background: 'linear-gradient(145deg, #667eea, #764ba2)',
               boxShadow: '4px 4px 10px rgba(0,0,0,0.1), -2px -2px 8px rgba(255,255,255,0.8)'
             }}>
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 text-right"> 
          <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">
            {course.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold">סמסטר {course.semester}</span>
          <Clock className="w-4 h-4 text-purple-500" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{getYearLabel(course.year)}</span>
          <Calendar className="w-4 h-4 text-purple-500" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-4 mt-auto">
        <span 
          className="rounded-full px-3.5 py-1.5 text-sm font-bold shadow-sm"
          style={{
            background: course.mandatory 
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            boxShadow: '3px 3px 8px rgba(0,0,0,0.08), inset 1px 1px 4px rgba(255,255,255,0.4)'
          }}
        >
          {getTypeLabel(course.mandatory)}
        </span>
        
        <span className="rounded-full px-3.5 py-1.5 bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 text-sm font-bold border border-purple-200/50"
          style={{
            boxShadow: '3px 3px 8px rgba(0,0,0,0.05), inset 1px 1px 4px rgba(255,255,255,0.6)'
          }}>
          <Award className="w-3.5 h-3.5 ml-1 inline" />
          {course.credits} נ&quot;ז
        </span>
      
        <span className="rounded-full px-3.5 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium border border-gray-200"
          style={{
            boxShadow: '3px 3px 8px rgba(0,0,0,0.05), inset 1px 1px 4px rgba(255,255,255,0.6)',
            direction: 'ltr',
            textAlign: 'left'
          }}>
          ID: {course.id}
        </span>
      </div>

      {course.prerequisites && course.prerequisites.length > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-200/60">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <Network className="w-4 h-4 text-purple-500" />
            <span>{course.prerequisites.length} דרישות קדם</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
