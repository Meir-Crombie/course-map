"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

type Course = {
  id: string
  name: string
  syllabus: string
  mandatoryAttendance: boolean
  coordinator: string
}

export default function CourseDetailsPage() {
  const params = useParams()
  const { id } = params

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then((data: Course[]) => {
        const found = data.find(c => c.id === id)
        setCourse(found || null)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-300">טוען פרטי קורס...</p>
        </div>
      </div>
    )
  }

  if (!course) {
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

        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-3xl font-bold mb-4 text-red-400">קורס לא נמצא</h1>
            <p className="text-gray-300 mb-8">הקורס שחיפשת אינו קיים במערכת</p>
            <Link 
              href="/courses"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              חזור לרשימת הקורסים
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-800/50 border-t border-blue-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-gray-400">
              <p>Created by Meir Crombie 💻</p>
            </div>
          </div>
        </footer>
      </div>
    )
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
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/courses" className="hover:text-blue-400 transition-colors">
              קורסים
            </Link>
            <span>→</span>
            <span className="text-white">{course.name}</span>
          </div>
        </nav>

        {/* Course Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-700/30">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {course.name}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">👨‍🏫</div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">רכז הקורס</p>
                  <p className="text-lg font-medium text-white">{course.coordinator}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📋</div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">נוכחות חובה</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${course.mandatoryAttendance 
                    ? 'bg-red-600/20 text-red-300 border border-red-500/30' 
                    : 'bg-green-600/20 text-green-300 border border-green-500/30'}`}>
                    {course.mandatoryAttendance ? "כן - נוכחות חובה" : "לא - נוכחות לא חובה"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end">
              <a 
                href={course.syllabus}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 צפה בסילבוס
                <span className="mr-2">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-700/30">
          <h2 className="text-2xl font-semibold mb-6 text-blue-300">מידע נוסף</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-medium mb-2">מטרות הקורס</h3>
              <p className="text-sm text-gray-300">פרטים זמינים בסילבוס</p>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-medium mb-2">דרישות קדם</h3>
              <p className="text-sm text-gray-300">עיינו בסילבוס למידע מלא</p>
            </div>
            <div className="text-3xl mb-2 text-center p-4 bg-slate-700/50 rounded-lg">
              <div>⭐</div>
              <h3 className="font-medium mb-2">הערכה</h3>
              <p className="text-sm text-gray-300">שיטת הערכה בסילבוס</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/courses"
            className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            ← חזור לרשימת הקורסים
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
