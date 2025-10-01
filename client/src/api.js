import axios from 'axios';

// Backend ka URL yahan set karein
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// Yeh interceptor har request ke saath token bhejta hai
API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
  }
  return req;
});

// Authentication API calls
export const login = (formData) => API.post('/api/auth/login', formData);
export const register = (formData) => API.post('/api/auth/register', formData);
export const fetchProfile = () => API.get('/api/auth/profile' );
// Profile picture upload ke liye naya function
export const uploadProfilePicture = (formData) => API.put('/api/auth/profile/picture', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Course API calls
export const fetchCourses = () => API.get('/api/courses');
export const createCourse = (courseData) => API.post('/api/courses', courseData);
export const completeCourse = (courseId) => API.post(`/api/courses/${courseId}/complete`);

// Post API calls
export const fetchPosts = (courseId) => API.get(`/api/posts/course/${courseId}`);
export const createPost = (courseId, postData) => API.post(`/api/posts/course/${courseId}`, postData);

