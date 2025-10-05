"use client"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CourseCard from "@/components/CourseCard"
import SearchBar from "@/components/SearchBar"
import coursesData from "@/data/courses.json"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "mandatory" | "optional">("all")
  const courses = coursesData.courses

  // Optimized filtering with useMemo
  const filteredCourses = useMemo(() => 
    courses.filter((course) => {
      // Search logic - match name OR description
      const matchesSearch = searchQuery === "" || 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      
      // Filter logic - mandatory/optional
      const matchesFilter = filterType === "all" ||
        (filterType === "mandatory" && course.mandatory) ||
        (filterType === "optional" && !course.mandatory)
      
      return matchesSearch && matchesFilter
    }),
    [courses, searchQuery, filterType]
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" dir="rtl">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            הקורסים שלנו
          </h1>
          
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            גלו את מגוון הקורסים האקדמיים שלנו - {filteredCourses.length} קורסים זמינים
          </p>

          {/* Search Bar Component */}
          <div className="mb-10 max-w-xl mx-auto">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="חפש קורס לפי שם או תיאור..."
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => setFilterType("all")}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
                filterType === "all" 
                  ? "bg-blue-600 text-white shadow-blue-200" 
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              כל הקורסים
            </button>
            <button
              onClick={() => setFilterType("mandatory")}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
                filterType === "mandatory" 
                  ? "bg-blue-600 text-white shadow-blue-200" 
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              חובה בלבד
            </button>
            <button
              onClick={() => setFilterType("optional")}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
                filterType === "optional" 
                  ? "bg-green-600 text-white shadow-green-200" 
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              רשות בלבד
            </button>
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto bg-blue-50">
              📚
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              לא נמצאו קורסים
            </h3>
            <p className="text-gray-500 text-lg mb-4">
              {searchQuery 
                ? `לא נמצאו קורסים עבור "${searchQuery}"`
                : "אין קורסים זמינים כרגע"
              }
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-4 text-blue-600 hover:underline font-medium"
              >
                נקה חיפוש
              </button>
            )}
          </motion.div>
        ) : (
          /* Responsive Grid Layout: 1→2→3 columns */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}