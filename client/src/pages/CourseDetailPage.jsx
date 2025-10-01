import { useState, useEffect } from 'react';
import * as api from '../api';
import { User, MessageSquare } from '../components/Icons';

export default function CourseDetailPage({ course, currentUser, showNotification }) {
    const [posts, setPosts] = useState([]);
    const [newPostText, setNewPostText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const { data } = await api.fetchPosts(course._id);
                setPosts(data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
                showNotification('Could not load discussion posts.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [course._id, showNotification]);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!newPostText.trim()) return;

        try {
            const { data } = await api.createPost(course._id, { text: newPostText });
            setPosts([data, ...posts]);
            setNewPostText('');
            showNotification('Post added successfully!', 'success');
        } catch (error) {
            console.error('Failed to create post:', error);
            showNotification('Could not add your post.', 'error');
        }
    };

    const handleCompleteCourse = async () => {
        try {
            await api.completeCourse(course._id);
            showNotification('Course marked as complete! +10 points!', 'success');
            // Note: A more robust state management solution (like Context or Redux)
            // would be needed to update the user's points across the app instantly.
        } catch (error) {
             console.error('Failed to complete course:', error);
             showNotification(error.response?.data?.message || 'Failed to mark as complete.', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
                <p className="mt-2 text-lg text-indigo-600 dark:text-indigo-400">By {course.mentor?.name || 'N/A'}</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{course.description}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Course Content</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{course.content}</p>
                {currentUser.role === 'Learner' && (
                    <div className="mt-6 text-right">
                        <button onClick={handleCompleteCourse} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
                           Mark as Complete
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Discussion Forum</h2>
                <form onSubmit={handlePostSubmit} className="mb-6">
                    <textarea 
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        placeholder="Ask a question or share your thoughts..."
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                    ></textarea>
                    <button type="submit" className="mt-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">Post</button>
                </form>

                <div className="space-y-4">
                    {loading ? <p>Loading posts...</p> : posts.map(post => (
                        <div key={post._id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center mb-2">
                                <User className="h-5 w-5 mr-2 text-gray-500" />
                                <p className="font-bold text-gray-800 dark:text-gray-200">{post.user?.name || 'User'}</p>
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{post.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

