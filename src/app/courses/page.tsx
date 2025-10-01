"use client"
import { motion } from "framer-motion"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import CourseCard from "../../components/CourseCard"
import coursesData from "../../data/courses.json"

export default function CoursesPage() {
  const courses = coursesData.courses

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: "var(--color-bg-main)"}}>
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 flex-1">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12" style={{color: "var(--color-text-primary)"}}
        >
          כל הקורסים
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto">📚</div>
            <h3 className="text-xl text-blue-700 mb-2">אין קורסים זמינים</h3>
            <p className="text-gray-600">נסה שוב מאוחר יותר</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
