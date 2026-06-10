import { createServerSupabaseClient } from "@/lib/supabase/server";
import { type Course } from "@/lib/supabase/types";
import { CourseGrid } from "@/components/dashboard/CourseGrid";

const MOCK_COURSES: Course[] = [
  { id: "1", title: "Advanced React Patterns", progress: 75, icon_name: "Layers", created_at: "" },
  { id: "2", title: "TypeScript Mastery", progress: 42, icon_name: "Code2", created_at: "" },
  { id: "3", title: "System Design Fundamentals", progress: 90, icon_name: "Network", created_at: "" },
  { id: "4", title: "Next.js Full Stack", progress: 28, icon_name: "Zap", created_at: "" },
];

async function fetchCourses(): Promise<Course[]> {
  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("courses")
      .select("id, title, progress, icon_name, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("[CoursesSection] Supabase error:", error.message);
      return MOCK_COURSES;
    }

    return (data ?? []).length > 0 ? (data as Course[]) : MOCK_COURSES;
  } catch (err) {
    console.warn("[CoursesSection] Fetch failed:", err);
    return MOCK_COURSES;
  }
}

export async function CoursesSection() {
  const courses = await fetchCourses();
  return <CourseGrid courses={courses} />;
}
