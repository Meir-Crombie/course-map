"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

type Course = {
  id: string
  name: string
  syllabus: string
  mandatoryAttendance: boolean
  coordinator: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
  }, [])

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
              <Link href="/courses" className="text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                קורסים
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          📚 רשימת קורסים
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <div key={course.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <Link href={`/courses/${course.id}`}>
                <h2 className="text-xl font-semibold mb-3 text-blue-300 hover:text-blue-200 transition-colors">
                  {course.name}
                </h2>
              </Link>
              <div className="space-y-2 mb-4">
                <p className="text-gray-300">
                  <span className="font-medium">רכז:</span> {course.coordinator}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">נוכחות חובה:</span> 
                  <span className={`mr-2 px-2 py-1 rounded text-xs font-medium ${course.mandatoryAttendance 
                    ? 'bg-red-600/20 text-red-300 border border-red-500/30' 
                    : 'bg-green-600/20 text-green-300 border border-green-500/30'}`}>
                    {course.mandatoryAttendance ? "כן" : "לא"}
                  </span>
                </p>
              </div>
              <a 
                href={course.syllabus} 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 underline text-sm transition-colors" 
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 צפה בסילבוס
              </a>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl text-gray-400 mb-2">טוען קורסים...</h3>
            <p className="text-gray-500">נא המתן בזמן שאנחנו טוענים את רשימת הקורסים</p>
          </div>
        )}
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
