interface CourseData {
  id: string;
  name: string;
  name_english?: string;
  code?: string;
  credits: number;
  semester: string;
  year: string;
  type?: string;
  mandatory: boolean;
  prerequisites?: string[];
  description: string;
}

export class Course {
  static async list(sortBy?: string): Promise<CourseData[]> {
    try {
      const response = await fetch('/courses.json');
      const data = await response.json();
      
      let courses = data.courses || data;
      
      if (sortBy === 'year') {
        courses = courses.sort((a: CourseData, b: CourseData) => {
          if (a.year !== b.year) {
            return a.year.localeCompare(b.year);
          }
          return a.semester.localeCompare(b.semester);
        });
      }
      
      return courses;
    } catch (error) {
      console.error('Error loading courses:', error);
      return [];
    }
  }
}

export type { CourseData };
