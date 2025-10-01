"use client"
import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
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
    <div className="min-h-screen flex flex-col" style={{backgroundColor: "var(--color-bg-main)"}}>
      <Header />

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

      <Footer />
    </div>
  )
}
