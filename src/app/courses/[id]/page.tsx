"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import CourseInfoCard from "../../../components/CourseInfoCard"
import PrimaryButton from "../../../components/PrimaryButton"

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">📚</div>
          <p className="text-xl text-gray-700">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
        {/* Navigation Bar */}
        <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-sm">
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
            <div className="text-6xl mb-4 bg-red-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">❌</div>
            <h1 className="text-3xl font-bold mb-4 text-red-600">Course Not Found</h1>
            <p className="text-gray-700 mb-8">The course you're looking for doesn't exist in our system.</p>
            <Link 
              href="/courses"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Back to Courses
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-blue-100">
              <p>© 2025 CourseMap. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-sm">
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
              <Link href="/courses" className="text-gray-700 hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                Courses
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/courses" className="hover:text-primary transition-colors">
              Courses
            </Link>
            <span>→</span>
            <span className="text-primary font-medium">{course.name}</span>
          </div>
        </nav>

        {/* Course Info Card */}
        <CourseInfoCard course={course} />

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <PrimaryButton href="/courses" icon={false}>
            Back to Home
          </PrimaryButton>
        </div>
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
