"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpen, Network, ArrowLeft, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 rounded-[24px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #E0BBE4, #B3E5FC)',
              boxShadow: '10px 10px 30px rgba(0,0,0,0.1), -10px -10px 30px rgba(255,255,255,0.9), inset 2px 2px 8px rgba(255,255,255,0.4)'
            }}
          >
            <BookOpen className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            ברוכים הבאים ל-CourseMap
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            פלטפורמה חכמה לניהול קורסים אקדמיים
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>תכנון מסלול לימודים מתקדם עם מפת תלותות אינטראקטיבית</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/courses">
              <div 
                className="p-8 rounded-[24px] hover:scale-105 transition-all duration-300 cursor-pointer group"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.9), inset 2px 2px 8px rgba(255,255,255,0.5)'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-16 h-16 rounded-[20px] flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(145deg, #A8E6CF, #B3E5FC)',
                      boxShadow: '6px 6px 15px rgba(0,0,0,0.08), -6px -6px 15px rgba(255,255,255,0.8)'
                    }}
                  >
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">כל הקורסים</h3>
                <p className="text-gray-600 leading-relaxed">
                  עיין בקטלוג המלא של הקורסים, חפש וסנן לפי שנה, סמסטר וסוג קורס
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/map">
              <div 
                className="p-8 rounded-[24px] hover:scale-105 transition-all duration-300 cursor-pointer group"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.9), inset 2px 2px 8px rgba(255,255,255,0.5)'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-16 h-16 rounded-[20px] flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(145deg, #E0BBE4, #FFE5D9)',
                      boxShadow: '6px 6px 15px rgba(0,0,0,0.08), -6px -6px 15px rgba(255,255,255,0.8)'
                    }}
                  >
                    <Network className="w-8 h-8 text-white" />
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">מפת תלותות</h3>
                <p className="text-gray-600 leading-relaxed">
                  הבן את הקשרים בין הקורסים באמצעות ויזואליזציה אינטראקטיבית של דרישות הקדם
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <div 
            className="inline-block p-6 rounded-[20px]"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              boxShadow: '6px 6px 15px rgba(0,0,0,0.05), -6px -6px 15px rgba(255,255,255,0.8)'
            }}
          >
            <p className="text-sm text-gray-600">
              תכנן את מסלול הלימודים שלך בצורה חכמה ואפקטיבית 
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
