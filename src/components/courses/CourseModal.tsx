"use client"

import React from 'react';
import { BookOpen, Calendar, Award, Network, List, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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

interface CourseModalProps {
  course: CourseData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  if (!course) return null;

  const getYearLabel = (year: string): string => {
    const labels: { [key: string]: string } = { "א": "שנה א׳", "ב": "שנה ב׳", "ג": "שנה ג׳", "ד": "שנה ד׳" };
    return labels[year] || `שנה ${year}`;
  };

  const getTypeColor = (mandatory: boolean): string => {
    return mandatory 
      ? "bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800" 
      : "bg-gradient-to-r from-blue-200 to-teal-200 text-teal-800";
  };

  const getTypeLabel = (mandatory: boolean): string => {
    return mandatory ? "חובה" : "בחירה";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '10px 10px 30px rgba(0,0,0,0.1), -10px -10px 30px rgba(255,255,255,0.9)'
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {course.name}
                  </h2>
                  <p className="text-gray-500">{course.id}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className={`${getTypeColor(course.mandatory)} rounded-full px-4 py-2 text-sm font-medium border-none`}>
                    {getTypeLabel(course.mandatory)}
                  </span>
                  <span className="rounded-full px-4 py-2 bg-white/70 border border-gray-200">
                    <Calendar className="w-4 h-4 ml-1 inline" />
                    סמסטר {course.semester}
                  </span>
                  <span className="rounded-full px-4 py-2 bg-white/70 border border-gray-200">
                    <Award className="w-4 h-4 ml-1 inline" />
                    {course.credits} נ&quot;ז
                  </span>
                  <span className="rounded-full px-4 py-2 bg-white/70 border border-gray-200">
                    {getYearLabel(course.year)}
                  </span>
                </div>

                <div 
                  className="p-4 rounded-[18px]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.05), inset -2px -2px 8px rgba(255,255,255,0.8)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <h4 className="font-semibold text-gray-800">קוד קורס</h4>
                  </div>
                  <p className="text-gray-700">{course.id}</p>
                </div>

                {course.description && (
                  <div 
                    className="p-4 rounded-[18px]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.05), inset -2px -2px 8px rgba(255,255,255,0.8)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <List className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-gray-800">תיאור הקורס</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{course.description}</p>
                  </div>
                )}

                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div 
                    className="p-4 rounded-[18px]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.05), inset -2px -2px 8px rgba(255,255,255,0.8)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Network className="w-4 h-4 text-orange-600" />
                      <h4 className="font-semibold text-gray-800">דרישות קדם</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {course.prerequisites.map((prereq: string, index: number) => (
                        <span 
                          key={index}
                          className="rounded-full px-3 py-1 bg-orange-50 border-orange-200 text-orange-700 border text-sm"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}