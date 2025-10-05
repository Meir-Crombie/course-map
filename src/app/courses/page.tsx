"use client"

import React, { useState, useEffect } from "react";
import { Course, CourseData } from "@/entities/Course";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

import SearchBar from "../../components/courses/SearchBar";
// import FilterPanel from "../../components/courses/FilterPanel";
import CourseCard from "@/components/courses/CourseCard";
import CourseModal from "../../components/courses/CourseModal";
import FilterPanel from "@/components/courses/FilterPanel";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    semester: string | null;
    year: string | null;
    type: string | null;
  }>({
    semester: null,
    year: null,
    type: null,
  });
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, searchQuery, filters]);

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const data = await Course.list("year");
      setCourses(data);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
    setIsLoading(false);
  };

  const filterCourses = () => {
    let filtered = [...courses];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.id?.toLowerCase().includes(query)
      );
    }

    if (filters.semester) {
      filtered = filtered.filter((course) => course.semester === filters.semester);
    }

    if (filters.year) {
      filtered = filtered.filter((course) => course.year === filters.year);
    }

    if (filters.type) {
      const isMandatory = filters.type === "חובה";
      filtered = filtered.filter((course) => course.mandatory === isMandatory);
    }

    setFilteredCourses(filtered);
  };

  const handleFilterChange = (key: string, value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      semester: null,
      year: null,
      type: null,
    });
    setSearchQuery("");
  };

  const handleCourseClick = (course: CourseData) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-[1400px] mx-auto" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-l from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
          כל הקורסים
        </h1>
        <p className="text-gray-500 text-lg">חפש, סנן וחקור את כל הקורסים הזמינים</p>
      </motion.div>

      <div className="mb-8 max-w-2xl mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <p className="text-gray-500 text-sm mt-4 text-center font-medium">
          נמצאו <span className="font-bold text-purple-600 text-base">{filteredCourses.length}</span> קורסים
        </p>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-20">
            <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
          </div>
        </div>

        <div className="lg:col-span-1 order-1 lg:order-2">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-[24px] bg-white/80"
                  >
                    <Skeleton className="h-8 w-3/4 mb-3 rounded-xl" />
                    <Skeleton className="h-4 w-1/2 mb-5 rounded-xl" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-7 w-20 rounded-full" />
                      <Skeleton className="h-7 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2 rounded-xl" />
                    <Skeleton className="h-4 w-2/3 rounded-xl" />
                  </div>
                ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="p-16 rounded-[28px] text-center bg-white/90 backdrop-blur-sm"
                 style={{
                   boxShadow: '8px 8px 20px rgba(0,0,0,0.06), -8px -8px 20px rgba(255,255,255,0.9), inset 3px 3px 8px rgba(255,255,255,0.6)'
                 }}>
              <AlertCircle className="w-20 h-20 mx-auto mb-5 text-purple-300" />
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                לא נמצאו קורסים
              </h3>
              <p className="text-gray-500 text-lg">נסה לשנות את הסינון או את החיפוש</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                >
                  <CourseCard
                    course={course}
                    onClick={() => handleCourseClick(course)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}