import { useState, useEffect } from 'react';
import * as api from '../api';
import { BookOpen, Users, Award } from '../components/Icons';

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105">
    <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const CourseCard = ({ course, onCourseClick }) => (
    <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-2"
        onClick={() => onCourseClick(course._id)}
    >
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">By {course.mentor?.name || 'Unknown Mentor'}</p>
            <div className="flex justify-end">
                <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                    Start Learning &rarr;
                </button>
            </div>
        </div>
    </div>
);

export default function DashboardPage({ user, courses, onCourseClick }) {
  const [profile, setProfile] = useState(user); // Shuruaat mein purana data dikhayein
  const [loading, setLoading] = useState(true);

  // ==> YEH NAYA USEEFFECT ADD KIYA GAYA HAI <==
  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        const { data } = await api.fetchProfile();
        setProfile(data); // Naye, taze data se state ko update karein
      } catch (error) {
        console.error("Could not fetch latest profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProfile();
  }, []); // Yeh effect sirf ek baar chalega jab component load hoga

  if (loading || !profile) {
    return <div>Loading Dashboard...</div>;
  }

  const isMentor = profile.role === 'Mentor';
  const recentCourses = courses.slice(0, 3);
  
  return (
    <div className="space-y-8 animate-fade-in">
        <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome back, {profile.name}!</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Ready to continue your learning journey?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                icon={<Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
                label="Your Points" 
                value={profile.points || 0} 
            />
            <StatCard 
                icon={<BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
                label={isMentor ? 'Courses Created' : 'Courses Completed'} 
                value={isMentor ? courses.filter(c => c.mentor?._id === profile._id).length : profile.courses_completed?.length || 0}
            />
            <StatCard 
                icon={<Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
                label="Role"
                value={profile.role} 
            />
        </div>
        
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Courses</h2>
            {recentCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentCourses.map(course => (
                        <CourseCard key={course._id} course={course} onCourseClick={onCourseClick} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No courses available yet.</p>
            )}
        </div>
    </div>
  );
}

