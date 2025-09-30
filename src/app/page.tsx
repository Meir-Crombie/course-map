"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Course = {
  id: string
  name: string
  syllabus: string
  mandatoryAttendance: boolean
  coordinator: string
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [searchResults, setSearchResults] = useState<Course[]>([])
  const router = useRouter()

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([])
      return
    }
    
    try {
      const response = await fetch("/api/courses")
      const coursesData = await response.json()
      const filtered = coursesData.filter((course: Course) =>
        course.name.toLowerCase().includes(term.toLowerCase()) ||
        course.coordinator.toLowerCase().includes(term.toLowerCase())
      )
      setSearchResults(filtered)
    } catch (error) {
      console.error("Error searching courses:", error)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchTerm)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Navigation Bar */}
      <nav className="bg-slate-800/80 backdrop-blur-sm border-b border-blue-700/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-400">🗺️ Course Map</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                בית
              </Link>
              <Link href="/courses" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                קורסים
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            מפת קורסים אקדמיים
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            ברוכים הבאים למפת הקורסים האקדמיים! כאן תוכלו למצוא מידע מפורט על כל הקורסים הזמינים,
            לחפש קורסים לפי שם או מרצה, ולקבל גישה מהירה לסילבוסים ולמידע חשוב.
            המטרה שלנו היא להקל עליכם את התהליך של תכנון לימודים ובחירת קורסים.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-700/30">
          <h3 className="text-2xl font-semibold mb-6 text-center text-blue-300">🔍 חיפוש קורסים</h3>
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="חפשו קורס לפי שם או מרצה..."
                className="w-full px-6 py-4 text-lg bg-slate-700/50 border border-blue-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute left-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                חפש
              </button>
            </div>
          </form>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-4 text-blue-300">תוצאות חיפוש:</h4>
              <div className="space-y-3">
                {searchResults.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="block p-4 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors border border-blue-700/20"
                  >
                    <h5 className="font-semibold text-white">{course.name}</h5>
                    <p className="text-gray-300 text-sm">רכז: {course.coordinator}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-3 text-blue-300">מידע מפורט</h3>
            <p className="text-gray-300">
              כל הפרטים החשובים על הקורסים: סילבוס, דרישות נוכחות, ופרטי התקשרות עם המרצים.
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30">
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-3 text-blue-300">חיפוש מתקדם</h3>
            <p className="text-gray-300">
              מנוע חיפוש חכם שמאפשר לכם למצוא קורסים לפי שם, נושא או מרצה בקלות ובמהירות.
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3 text-blue-300">ממשק ידידותי</h3>
            <p className="text-gray-300">
              עיצוב נקי ואינטואיטיבי שהופך את תהליך החיפוש והניווט לפשוט ונעים.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            href="/courses"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-lg"
          >
            צפייה בכל הקורסים
            <span className="mr-2">→</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-blue-700/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400">
            <p>Created by Meir Crombie 💻</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
