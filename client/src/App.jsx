import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CreateCoursePage from './pages/CreateCoursePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Notification from './components/Notification';
import * as api from './api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setCurrentUser(user);
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('login');
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const { data } = await api.fetchCourses();
          setCourses(data);
        } catch (error) {
          console.error('Failed to fetch courses:', error);
          showNotification('Could not load courses.', 'error');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchInitialData();
  }, [currentUser]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    setCurrentPage('dashboard');
    showNotification('Logged in successfully!', 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setCurrentPage('login');
    showNotification('Logged out successfully!', 'success');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleCourseClick = (id) => {
    setSelectedCourseId(id);
    navigateTo('courseDetail');
  };

  const handleCourseCreated = (newCourse) => {
    setCourses([newCourse, ...courses]);
    navigateTo('courses');
    showNotification('Course created successfully!', 'success');
  };
  
  const selectedCourse = courses.find(course => course._id === selectedCourseId);

  const renderPage = () => {
    if (!currentUser || currentPage === 'login') {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage user={currentUser} courses={courses} onCourseClick={handleCourseClick} />;
      case 'courses':
        return <CoursesPage courses={courses} onCourseClick={handleCourseClick} loading={loading} />;
      case 'createCourse':
        return <CreateCoursePage onCourseCreated={handleCourseCreated} />;
      case 'courseDetail':
        return selectedCourse ? <CourseDetailPage course={selectedCourse} currentUser={currentUser} showNotification={showNotification} /> : <p>Loading course...</p>;
      case 'profile':
        return <ProfilePage onLogout={handleLogout} />;
      default:
        return <DashboardPage user={currentUser} courses={courses} onCourseClick={handleCourseClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {currentUser && (
        <Navbar 
          user={currentUser} 
          onNavigate={navigateTo} 
          onLogout={handleLogout} 
          currentPage={currentPage}
        />
      )}
      
      {/* Main content area mein padding/margin a responsive tarike se add kiya gaya hai */}
      <div className={currentUser ? "pb-20 md:pb-0 md:ml-64" : ""}>
        <main className="container mx-auto p-4 sm:p-6 md:p-8">
          {renderPage()}
        </main>
      </div>

      {notification.message && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
}

