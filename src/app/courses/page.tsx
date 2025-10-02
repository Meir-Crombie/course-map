"use client"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import CourseCard from "../../components/CourseCard"
import coursesData from "../../data/courses.json"

export default function CoursesPage() {
  const courses = coursesData.courses
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchTerm === "" || 
      course.name.includes(searchTerm) || 
      course.description.includes(searchTerm)
    
    const matchesFilter = filterType === "all" ||
      (filterType === "mandatory" && course.mandatory) ||
      (filterType === "optional" && !course.mandatory)
    
    return matchesSearch && matchesFilter
  })

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #F0F4F8 0%, #E0E7FF 100%)"
      }}
    >
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 flex-1">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1F2937" }}
          >
            כל הקורסים
          </h1>
          <p 
            className="text-xl mb-8"
            style={{ color: "#6B7280" }}
          >
            {filteredCourses.length} קורסים זמינים
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
              />
              <input
                type="text"
                placeholder="חפש קורסים, מרצים או נושאים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-6 py-4 rounded-full border-2 border-transparent bg-white shadow-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all text-right"
                style={{ outline: "none" }}
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => setFilterType("all")}
              className="px-6 py-2.5 rounded-full font-medium transition-all"
              style={{
                backgroundColor: filterType === "all" ? "#3B82F6" : "white",
                color: filterType === "all" ? "white" : "#4B5563",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
              }}
            >
              כל הקורסים
            </button>
            <button
              onClick={() => setFilterType("mandatory")}
              className="px-6 py-2.5 rounded-full font-medium transition-all"
              style={{
                backgroundColor: filterType === "mandatory" ? "#3B82F6" : "white",
                color: filterType === "mandatory" ? "white" : "#4B5563",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
              }}
            >
              חובה בלבד
            </button>
            <button
              onClick={() => setFilterType("optional")}
              className="px-6 py-2.5 rounded-full font-medium transition-all"
              style={{
                backgroundColor: filterType === "optional" ? "#10B981" : "white",
                color: filterType === "optional" ? "white" : "#4B5563",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
              }}
            >
              רשות בלבד
            </button>
          </div>
        </motion.div>
        
        {/* Courses Grid - 3 COLUMNS */}
        <div 
          className="grid gap-6 mb-12"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            maxWidth: "1400px",
            margin: "0 auto"
          }}
        >
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div 
              className="text-6xl mb-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto"
              style={{ backgroundColor: "#DBEAFE" }}
            >
              📚
            </div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              לא נמצאו קורסים
            </h3>
            <p className="text-gray-600">נסה לשנות את החיפוש או הסינון</p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}