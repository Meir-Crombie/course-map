"use client"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, AlertCircle, Filter, X } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CourseCard from "@/components/CourseCard"
import coursesData from "@/data/courses.json"

export default function CoursesPage() {
  const allCourses = coursesData.courses
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<{
    semester: string | null;
    year: string | null;
    type: string | null;
  }>({
    semester: null,
    year: null,
    type: null,
  })

  // Get unique values for filters
  const semesters = useMemo(() => 
    [...new Set(allCourses.map(c => c.semester))].sort(),
    [allCourses]
  )
  const years = useMemo(() => 
    [...new Set(allCourses.map(c => c.year))].sort(),
    [allCourses]
  )

  // Filter courses
  const filteredCourses = useMemo(() => {
    let filtered = [...allCourses]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.id.toLowerCase().includes(query) ||
          course.description?.toLowerCase().includes(query)
      )
    }

    // Semester filter
    if (filters.semester) {
      filtered = filtered.filter((course) => course.semester === filters.semester)
    }

    // Year filter
    if (filters.year) {
      filtered = filtered.filter((course) => course.year === filters.year)
    }

    // Type filter (mandatory/optional)
    if (filters.type) {
      filtered = filtered.filter((course) => 
        filters.type === "mandatory" ? course.mandatory : !course.mandatory
      )
    }

    return filtered
  }, [allCourses, searchQuery, filters])

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      semester: null,
      year: null,
      type: null,
    })
    setSearchQuery("")
  }

  const hasActiveFilters = searchQuery || filters.semester || filters.year || filters.type

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            כל הקורסים
          </h1>
          <p className="text-gray-600">חפש, סנן וחקור את כל הקורסים הזמינים</p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="חפש לפי שם קורס, קוד או תיאור..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-6 py-4 rounded-[20px] transition-all text-right shadow-md focus:shadow-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <div
              className="p-6 rounded-[20px] sticky top-24"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.9)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  סינון
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    נקה הכל
                  </button>
                )}
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">סוג קורס</h3>
                <div className="space-y-2">
                  {[
                    { label: "חובה", value: "mandatory" },
                    { label: "בחירה", value: "optional" },
                  ].map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => handleFilterChange("type", value)}
                      className={`w-full text-right px-4 py-2 rounded-xl transition-all ${
                        filters.type === value
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                          : "bg-white/50 text-gray-700 hover:bg-white/80"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Semester Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">סמסטר</h3>
                <div className="space-y-2">
                  {semesters.map((semester) => (
                    <button
                      key={semester}
                      onClick={() => handleFilterChange("semester", semester)}
                      className={`w-full text-right px-4 py-2 rounded-xl transition-all ${
                        filters.semester === semester
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                          : "bg-white/50 text-gray-700 hover:bg-white/80"
                      }`}
                    >
                      {semester}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">שנה</h3>
                <div className="space-y-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleFilterChange("year", year)}
                      className={`w-full text-right px-4 py-2 rounded-xl transition-all ${
                        filters.year === year
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                          : "bg-white/50 text-gray-700 hover:bg-white/80"
                      }`}
                    >
                      שנה {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div
                className="p-12 rounded-[24px] text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.9)',
                }}
              >
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  לא נמצאו קורסים
                </h3>
                <p className="text-gray-500 mb-4">נסה לשנות את הסינון או את החיפוש</p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all"
                  >
                    נקה סינון
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">
                    נמצאו <span className="font-bold text-purple-600">{filteredCourses.length}</span> קורסים
                  </p>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="wait">
                    {filteredCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                      >
                        <CourseCard course={course} index={index} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}