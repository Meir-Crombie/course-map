"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import CourseInfoCard from "../../../components/CourseInfoCard"
import PrimaryButton from "../../../components/PrimaryButton"
import coursesData from "../../../data/courses.json"

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

export default function CourseDetailsPage() {
  const params = useParams()
  const { id } = params

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const found = coursesData.courses.find(c => c.id === id)
    setCourse(found || null)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{backgroundColor: "var(--color-bg-main)"}}>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4 bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">📚</div>
            <p className="text-xl text-gray-700">Loading course details...</p>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col" style={{backgroundColor: "var(--color-bg-main)"}}>
        <Header />

        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-4 bg-red-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">❌</div>
            <h1 className="text-3xl font-bold mb-4 text-red-600">Course Not Found</h1>
            <p className="text-gray-700 mb-8">The course you&apos;re looking for doesn&apos;t exist in our system.</p>
            <Link 
              href="/courses"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Back to Courses
            </Link>
          </motion.div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: "var(--color-bg-main)"}}>
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
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

      <Footer />
    </div>
  )
}
