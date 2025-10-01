"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SearchBar from "../components/SearchBar"
import CourseCard from "../components/CourseCard"
import PrimaryButton from "../components/PrimaryButton"

type Course = {
  id: string
  name: string
  syllabus: string
  mandatoryAttendance: boolean
  coordinator: string
  description?: string
}

// Dummy courses data with descriptions
const dummyCourses: Course[] = [
  {
    id: "intro-cs",
    name: "מבוא למדעי המחשב",
    syllabus: "/docs/intro-cs.pdf",
    mandatoryAttendance: true,
    coordinator: "ד״ר כהן",
    description: "קורס יסוד המקנה הכרת יסודות התכנות, אלגוריתמים בסיסיים ומבני נתונים. כולל תרגול מעשי בשפת Python ופרויקט גמר."
  },
  {
    id: "algorithms", 
    name: "אלגוריתמים",
    syllabus: "/docs/algorithms.pdf",
    mandatoryAttendance: false,
    coordinator: "פרופ׳ לוי",
    description: "לימוד אלגוריתמים מתקדמים, ניתוח מורכבות זמן ומקום, אלגוריתמי גרפים וטכניקות אופטימיזציה. דורש ידע קודם בתכנות."
  },
  {
    id: "data-structures",
    name: "מבני נתונים",
    syllabus: "/docs/data-structures.pdf", 
    mandatoryAttendance: true,
    coordinator: "ד״ר רוזנברג",
    description: "מבני נתונים מתקדמים כמו עצים, גרפים, hash tables וקווי המתנה. דגש על יישום מעשי ובחירת המבנה המתאים לבעיה."
  },
  {
    id: "databases",
    name: "מסדי נתונים", 
    syllabus: "/docs/databases.pdf",
    mandatoryAttendance: false,
    coordinator: "פרופ׳ אברהם",
    description: "עקרונות מסדי נתונים יחסיים, SQL, עיצוב מסדי נתונים ונורמליזציה. כולל פרויקט בניית מערכת מסד נתונים מלאה."
  },
  {
    id: "machine-learning",
    name: "למידת מכונה",
    syllabus: "/docs/ml.pdf",
    mandatoryAttendance: true, 
    coordinator: "ד״ר שמיר",
    description: "אלגוריתמי למידה מפוקחת ולא מפוקחת, רשתות נוירונים ולמידה עמוקה. דורש ידע במתמטיקה ותכנות Python."
  },
  {
    id: "web-development",
    name: "פיתוח אתרי אינטרנט",
    syllabus: "/docs/web-dev.pdf",
    mandatoryAttendance: false,
    coordinator: "מר דוידוב", 
    description: "פיתוח full-stack עם HTML, CSS, JavaScript, React ו-Node.js. דגש על responsive design ו-UX. כולל פרויקט אתר אישי."
  }
]

export default function Home() {
  const [searchResults, setSearchResults] = useState<Course[]>([])
  const [courses, setCourses] = useState<Course[]>(dummyCourses)
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>(dummyCourses.slice(0, 6))
  const router = useRouter()

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.coordinator.toLowerCase().includes(query.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(query.toLowerCase()))
    )
    setSearchResults(filtered)
  }

  const goToCourseMap = () => {
    router.push('/courses')
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: "var(--color-bg-main)"}}>
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50" style={{backgroundColor: "var(--color-bg-card)", boxShadow: "var(--shadow-sm)"}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold" style={{color: "var(--color-primary)"}}>🗺️ Course Map</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium" style={{color: "var(--color-primary)", backgroundColor: "rgba(56, 128, 245, 0.1)", boxShadow: "var(--shadow-sm)"}}>
                בית
              </Link>
              <Link href="/courses" className="px-4 py-2 rounded-lg text-sm font-medium transition-all nav-link" style={{color: "var(--color-text-secondary)"}}>
                קורסים
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

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

      {/* Footer */}
      <footer className="text-white py-8 px-4 sm:px-6 lg:px-8" style={{backgroundColor: "var(--color-primary)"}}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white opacity-80">© 2025 CourseMap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
