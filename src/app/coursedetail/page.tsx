'use client';

import CourseDetailPage from '@/components/CourseDetailPage';

const CourseDetailPagePage = () => {
  const courses = [
    {
      id: 1,
      title: "React Development Mastery",
      description: "Master React from basics to advanced concepts",
      duration: "12 weeks",
      students: 890,
      rating: 4.9,
      price: "$79",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      progress: 65,
      enrolled: true,
      instructor: "John Doe",
      modules: [
        {
          id: 1,
          title: "Module 1: Introduction to React",
          summary: "Learn the basics of React and JSX",
          coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
          lessons: [
            { completed: true },
            { completed: false }
          ]
        },
      ],
    }
  ];

  return <CourseDetailPage courses={courses} />;
}

export default CourseDetailPagePage;
