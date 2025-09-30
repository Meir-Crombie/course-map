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
      .catch(() => {
        // Fallback to dummy data if API fails
        setCourses([
          {
            id: "intro-cs",
            name: "מבוא למדעי המחשב",
            syllabus: "/docs/intro-cs.pdf",
            mandatoryAttendance: true,
            coordinator: "ד״ר כהן"
          },
          {
            id: "algorithms",
            name: "אלגוריתמים", 
            syllabus: "/docs/algorithms.pdf",
            mandatoryAttendance: false,
            coordinator: "פרופ׳ לוי"
          }
        ])
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">🗺️ Course Map</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                בית
              </Link>
              <Link href="/courses" className="text-blue-600 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium">
                קורסים
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          📚 כל הקורסים
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div key={course.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-blue-100">
              <Link href={`/courses/${course.id}`}>
                <h2 className="text-xl font-semibold mb-3 text-blue-700 hover:text-blue-900 transition-colors">
                  {course.name}
                </h2>
              </Link>
              <div className="space-y-3 mb-4">
                <p className="text-gray-700 flex items-center">
                  <span className="font-medium text-blue-600">👨‍🏫 רכז:</span> 
                  <span className="mr-2">{course.coordinator}</span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <span className="font-medium text-blue-600">📋 נוכחות חובה:</span> 
                  <span className={`mr-2 px-3 py-1 rounded-full text-xs font-medium ${course.mandatoryAttendance 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-green-100 text-green-700 border border-green-200'}`}>
                    {course.mandatoryAttendance ? "כן" : "לא"}
                  </span>
                </p>
              </div>
              <a 
                href={course.syllabus} 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors bg-blue-50 px-3 py-2 rounded-lg" 
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 צפה בסילבוס
                <span className="mr-1">↗</span>
              </a>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto">📚</div>
            <h3 className="text-xl text-blue-700 mb-2">טוען קורסים...</h3>
            <p className="text-gray-600">נא המתן בזמן שאנחנו טוענים את רשימת הקורסים</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-blue-100">
            <p>Created with ❤️ by Meir Crombie 💻</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
