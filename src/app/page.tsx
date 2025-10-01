"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import CourseCard from "../components/CourseCard"
import PrimaryButton from "../components/PrimaryButton"
import coursesData from "../data/courses.json"

type Course = {
  id: string
  name: string
  credits: number
  semester: string
  year: string
  mandatory: boolean
  prerequisites: string[]
  corequisites?: string[]
  requiredKnowledge?: string[]
  alternativePrerequisites?: string
  notes?: string
  description: string
}

export default function Home() {
  const [searchResults, setSearchResults] = useState<Course[]>([])
  const courses = coursesData.courses
  const displayedCourses = coursesData.courses.slice(0, 6)
  const router = useRouter()

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.semester.toLowerCase().includes(query.toLowerCase()) ||
      course.year.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filtered)
  }

  const goToCourseMap = () => {
    router.push('/courses')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: "var(--color-bg-main)"}}>
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6" style={{color: "var(--color-text-primary)"}}
          >
            Welcome to CourseMap
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed" style={{color: "var(--color-text-secondary)"}}
          >
            Discover all available courses, search by topic or instructor, and get quick access to important information about each course.
          </motion.p>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} placeholder="Search courses, instructors, or topics..." />
          </div>

          {/* Go to Course Map Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <PrimaryButton onClick={goToCourseMap} size="lg">
              Go to Course Map
            </PrimaryButton>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <main className="courses-container">
          <section className="courses-section">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="section-title"
            >
              תוצאות חיפוש ({searchResults.length})
            </motion.h2>
            <div className="courses-grid">
              {searchResults.map((course, index) => (
                <article key={course.id}>
                  <CourseCard course={course} index={index} />
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* Featured Courses */}
      {searchResults.length === 0 && (
        <main className="courses-container">
          <section className="courses-section">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="section-title"
            >
              קורסים מובילים
            </motion.h2>
            
            <div className="courses-grid">
              {displayedCourses.map((course, index) => (
                <article key={course.id}>
                  <CourseCard course={course} index={index} />
                </article>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-12"
            >
              <PrimaryButton href="/courses" variant="secondary">
                צפה בכל הקורסים
              </PrimaryButton>
            </motion.div>
          </section>
        </main>
      )}

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{backgroundColor: "var(--color-bg-card)"}}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-center" style={{color: "var(--color-text-primary)"}}
          >
            ✨ למה לבחור במפת הקורסים שלנו?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "חיפוש חכם",
                description: "מצאו בקלות את הקורס המתאים לכם עם מנוע החיפוש המתקדם שלנו"
              },
              {
                icon: "📚", 
                title: "מידע מפורט",
                description: "כל המידע שאתם צריכים על כל קורס - סילבוס, מרצים, דרישות ועוד"
              },
              {
                icon: "⚡",
                title: "גישה מהירה", 
                description: "ממשק אינטואיטיבי וידידותי שחוסך לכם זמן יקר"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-8 transition-all duration-300 text-center" style={{boxShadow: "var(--shadow-card)", backgroundColor: "var(--color-bg-main)"}}
              >
                <div className="text-4xl mb-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto" style={{backgroundColor: "rgba(56, 128, 245, 0.1)"}}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4" style={{color: "var(--color-primary)"}}>{feature.title}</h3>
                <p style={{color: "var(--color-text-secondary)"}}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
