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
    const matchesSearch =
      searchTerm === "" ||
      course.name.includes(searchTerm) ||
      course.description.includes(searchTerm)

    const matchesFilter =
      filterType === "all" ||
      (filterType === "mandatory" && course.mandatory) ||
      (filterType === "optional" && !course.mandatory)

    return matchesSearch && matchesFilter
  })

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #F0F4F8 0%, #E0E7FF 100%)",
      }}
    >
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16 flex-1">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            כל הקורסים
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            {filteredCourses.length} קורסים זמינים
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="חפש קורסים, מרצים או נושאים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-6 py-4 rounded-full bg-white shadow-md focus:ring-4 focus:ring-blue-200 focus:outline-none text-right transition-all placeholder-gray-400 text-gray-700"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { label: "כל הקורסים", value: "all", color: "blue" },
              { label: "חובה בלבד", value: "mandatory", color: "blue" },
              { label: "רשות בלבד", value: "optional", color: "green" },
            ].map(({ label, value, color }) => (
              <button
                key={value}
                onClick={() => setFilterType(value)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow-md hover:scale-105 duration-300 ${
                  filterType === value
                    ? `bg-${color}-500 text-white`
                    : "bg-white text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div
          className="grid gap-6 mb-12 place-items-center sm:grid-cols-2 lg:grid-cols-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 min-h-[360px] flex flex-col justify-between"
            >
              <CourseCard course={course} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto bg-blue-100">
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
  