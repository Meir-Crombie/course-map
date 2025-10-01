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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: "var(--color-text-primary)"}}>
            כל הקורסים
          </h1>
          <p className="text-lg" style={{color: "var(--color-text-secondary)"}}>
            {courses.length} קורסים זמינים
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
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
