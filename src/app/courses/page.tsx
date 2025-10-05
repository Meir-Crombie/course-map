import React, { useState, useEffect } from "react";
import { Course, CourseData } from "@/entities/Course";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

import SearchBar from "../../components/courses/SearchBar";
import FilterPanel from "../../components/courses/FilterPanel";
import CourseCard from "../../components/courses/CourseCard";
import CourseModal from "../../components/courses/CourseModal";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
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
          course.name_english?.toLowerCase().includes(query) ||
          course.code?.toLowerCase().includes(query)
      );
    }

    if (filters.semester) {
      filtered = filtered.filter((course) => course.semester === filters.semester);
    }

    if (filters.year) {
      filtered = filtered.filter((course) => course.year === filters.year);
    }

    if (filters.type) {
      filtered = filtered.filter((course) => course.type === filters.type);
    }

    setFilteredCourses(filtered);
  };

  const handleFilterChange = (key: any, value: any) => {
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
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          כל הקורסים
        </h1>
        <p className="text-gray-600">חפש, סנן וחקור את כל הקורסים הזמינים</p>
      </motion.div>

      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-[20px] bg-white/80"
                  >
                    <Skeleton className="h-8 w-3/4 mb-2 rounded-xl" />
                    <Skeleton className="h-4 w-1/2 mb-4 rounded-xl" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2 rounded-xl" />
                    <Skeleton className="h-4 w-2/3 rounded-xl" />
                  </div>
                ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="p-12 rounded-[24px] text-center bg-white/80 backdrop-blur-sm">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                לא נמצאו קורסים
              </h3>
              <p className="text-gray-500">נסה לשנות את הסינון או את החיפוש</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600 text-sm md:text-base">
                  נמצאו <span className="font-bold text-purple-600">{filteredCourses.length}</span> קורסים
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onClick={() => handleCourseClick(course)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </>
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