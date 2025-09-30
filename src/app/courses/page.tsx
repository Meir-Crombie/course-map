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
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50" style={{boxShadow: 'var(--shadow-sm)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">CourseMap</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                Home
              </Link>
              <Link href="/courses" className="text-primary bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium" style={{color: 'var(--color-primary)', backgroundColor: 'rgba(59, 130, 246, 0.1)', boxShadow: 'var(--shadow-sm)'}}>
                Courses
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                News
              </Link>
              <Link href="/map" className="text-gray-700 hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                Map
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="courses-container">
        <section className="courses-section">
          <h1 className="section-title" style={{fontSize: '32px', textAlign: 'center', marginBottom: '40px'}}>
            כל הקורסים
          </h1>
          
          <div className="courses-grid">
            {courses.map((course, index) => (
              <article key={course.id} className="course-card">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 h-full" style={{boxShadow: 'var(--shadow-md)', backgroundColor: 'var(--color-bg-card)'}}>
                  <Link href={`/courses/${course.id}`}>
                    <h2 className="text-xl font-semibold mb-3 text-blue-700 hover:text-blue-900 transition-colors">
                      {course.name}
                    </h2>
                  </Link>
              <div className="space-y-3 mb-4">
                <p className="text-gray-700 flex items-center">
                  <span className="font-medium text-blue-600">👨‍🏫 Coordinator:</span> 
                  <span className="mr-2">{course.coordinator}</span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <span className="font-medium text-blue-600">📋 Attendance:</span> 
                  <span className={`mr-2 px-3 py-1 rounded-full text-xs font-medium ${course.mandatoryAttendance 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-green-100 text-green-700 border border-green-200'}`}>
                    {course.mandatoryAttendance ? "Mandatory" : "Optional"}
                  </span>
                </p>
              </div>
                  <a 
                    href={course.syllabus} 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors bg-blue-50 px-3 py-2 rounded-lg" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 View Syllabus
                    <span className="mr-1">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto">📚</div>
              <h3 className="text-xl text-blue-700 mb-2">Loading courses...</h3>
              <p className="text-gray-600">Please wait while we load the course list</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-blue-100">
            <p>© 2025 CourseMap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
