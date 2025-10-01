const CourseCard = ({ course, onCourseClick }) => (
    <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-2 group"
        onClick={() => onCourseClick(course._id)}
    >
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{course.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Mentor: {course.mentor?.name || 'N/A'}</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{course.description}</p>
        </div>
        <div className="px-6 pb-4">
             <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                View Details &rarr;
            </button>
        </div>
    </div>
);


export default function CoursesPage({ courses, onCourseClick, loading }) {
    if (loading) {
        return <div className="text-center text-xl">Loading courses...</div>
    }

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">All Courses</h1>
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {courses.map(course => (
                        <CourseCard key={course._id} course={course} onCourseClick={onCourseClick} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No courses have been created yet.</p>
            )}
        </div>
    );
}

