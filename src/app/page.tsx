"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Network, ArrowLeft, Sparkles, GraduationCap, Target, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/entities/Course";

export default function HomePage() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    requiredCourses: 0,
    electiveCourses: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const courses = await Course.list();
      setStats({
        totalCourses: courses.length,
        requiredCourses: courses.filter(c => c.mandatory).length,
        electiveCourses: courses.filter(c => !c.mandatory).length,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: "קטלוג קורסים מלא",
      description: "גישה לכל הקורסים המוצעים עם פרטים מלאים ומעודכנים",
      color: "from-purple-400 to-purple-600",
      bgColor: "rgba(224, 187, 228, 0.2)",
    },
    {
      icon: Network,
      title: "מפת תלותות חכמה",
      description: "הבנה ויזואלית של קשרי דרישות הקדם בין הקורסים",
      color: "from-blue-400 to-blue-600",
      bgColor: "rgba(179, 229, 252, 0.2)",
    },
    {
      icon: Target,
      title: "סינון מתקדם",
      description: "חיפוש וסינון קורסים לפי שנה, סמסטר וסוג קורס",
      color: "from-teal-400 to-teal-600",
      bgColor: "rgba(168, 230, 207, 0.2)",
    },
    {
      icon: TrendingUp,
      title: "תכנון מסלול",
      description: "תכנן את מסלול הלימודים שלך בצורה חכמה ויעילה",
      color: "from-pink-400 to-pink-600",
      bgColor: "rgba(255, 229, 217, 0.2)",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-28 h-28 mx-auto mb-8 rounded-[28px] flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(145deg, #E0BBE4, #B3E5FC)',
              boxShadow: '12px 12px 35px rgba(0,0,0,0.12), -12px -12px 35px rgba(255,255,255,0.9), inset 3px 3px 10px rgba(255,255,255,0.4)'
            }}
          >
            <GraduationCap className="w-14 h-14 text-white" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              ברוכים הבאים
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ל-Devlev
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-4 font-medium"
          >
            פלטפורמה חכמה לניהול קורסים אקדמיים
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[20px] bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm"
            style={{
              boxShadow: 'inset 2px 2px 8px rgba(255,255,255,0.8), inset -2px -2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-800">תכנון מסלול לימודים מתקדם</span>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-4 md:gap-6 mb-16"
        >
          {[
            { label: "סה\"כ קורסים", value: stats.totalCourses, color: "from-purple-400 to-purple-600" },
            { label: "קורסי חובה", value: stats.requiredCourses, color: "from-blue-400 to-blue-600" },
            { label: "קורסי בחירה", value: stats.electiveCourses, color: "from-teal-400 to-teal-600" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="p-6 rounded-[24px] text-center bg-white/80 backdrop-blur-sm"
              style={{
                boxShadow: '8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.9), inset 2px 2px 8px rgba(255,255,255,0.5)'
              }}
            >
              <div className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link href="/courses">
              <div 
                className="p-8 md:p-10 rounded-[28px] cursor-pointer group relative overflow-hidden bg-white/80 backdrop-blur-sm"
                style={{
                  boxShadow: '10px 10px 30px rgba(0,0,0,0.1), -10px -10px 30px rgba(255,255,255,0.9), inset 3px 3px 10px rgba(255,255,255,0.5)'
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-20 h-20 rounded-[24px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(145deg, #A8E6CF, #B3E5FC)',
                        boxShadow: '8px 8px 20px rgba(0,0,0,0.1), -8px -8px 20px rgba(255,255,255,0.8)'
                      }}
                    >
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowLeft className="w-6 h-6 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">כל הקורסים</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    עיין בקטלוג המלא של הקורסים, חפש וסנן לפי שנה, סמסטר וסוג קורס
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link href="/map">
              <div 
                className="p-8 md:p-10 rounded-[28px] cursor-pointer group relative overflow-hidden bg-white/80 backdrop-blur-sm"
                style={{
                  boxShadow: '10px 10px 30px rgba(0,0,0,0.1), -10px -10px 30px rgba(255,255,255,0.9), inset 3px 3px 10px rgba(255,255,255,0.5)'
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-20 h-20 rounded-[24px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(145deg, #E0BBE4, #FFE5D9)',
                        boxShadow: '8px 8px 20px rgba(0,0,0,0.1), -8px -8px 20px rgba(255,255,255,0.8)'
                      }}
                    >
                      <Network className="w-10 h-10 text-white" />
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowLeft className="w-6 h-6 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">מפת תלותות</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    הבן את הקשרים בין הקורסים באמצעות ויזואליזציה אינטראקטיבית של דרישות הקדם
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            למה Devlev?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-6 rounded-[24px] text-center bg-white/80 backdrop-blur-sm"
                style={{
                  boxShadow: '8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.9), inset 2px 2px 8px rgba(255,255,255,0.5)'
                }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-[20px] flex items-center justify-center"
                  style={{
                    background: `linear-gradient(145deg, ${feature.bgColor}, white)`,
                    boxShadow: '6px 6px 15px rgba(0,0,0,0.08), -6px -6px 15px rgba(255,255,255,0.8)'
                  }}
                >
                  <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} text-transparent`} style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }} />
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 }}
          className="text-center"
        >
          <div 
            className="inline-block p-8 rounded-[24px] bg-gradient-to-r from-purple-100/80 to-blue-100/80 backdrop-blur-sm"
            style={{
              boxShadow: '8px 8px 25px rgba(0,0,0,0.08), -8px -8px 25px rgba(255,255,255,0.9), inset 2px 2px 8px rgba(255,255,255,0.6)'
            }}
          >
            <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              מוכנים להתחיל?
            </h3>
            <p className="text-gray-600 mb-6">
              תכנן את מסלול הלימודים שלך בצורה חכמה ואפקטיבית
            </p>
            <Link href="/courses">
              <button 
                className="clay-button text-white font-bold px-8 py-6 text-lg rounded-[20px]"
              >
                <BookOpen className="w-5 h-5 ml-2" />
                התחל לחקור קורסים
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}