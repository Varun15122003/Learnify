import { useState, useEffect, useRef } from 'react';
import * as api from '../api';
import { LogOutIcon, UserCircle, CheckCircle, BookOpen, UploadCloud } from '../components/Icons';

export default function ProfilePage({ onLogout }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newPicture, setNewPicture] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const { data } = await api.fetchProfile();
            setProfile(data);
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleFileChange = (e) => {
        setNewPicture(e.target.files[0]);
    };

    const handlePictureUpload = async () => {
        if (!newPicture) return;

        const formData = new FormData();
        formData.append('profilePicture', newPicture);

        setUploading(true);
        try {
            const { data } = await api.uploadProfilePicture(formData);
            setProfile({ ...profile, profilePicture: data.profilePicture });
            // Update user in localStorage as well
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                storedUser.profilePicture = data.profilePicture;
                localStorage.setItem('user', JSON.stringify(storedUser));
            }
            setNewPicture(null);
        } catch (error) {
            console.error("Failed to upload picture", error);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return <div className="text-center text-xl">Loading profile...</div>;
    }

    if (!profile) {
        return <div className="text-center text-xl">Could not load profile.</div>;
    }
    
    // Backend path ko frontend URL mein badlein
    const serverUrl = import.meta.env.VITE_API_URL;
    const profilePicUrl = profile.profilePicture ? `${serverUrl}${profile.profilePicture}` : null;

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        {profilePicUrl && profile.profilePicture !== '/uploads/default.png' ? (
                            <img src={profilePicUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500" />
                        ) : (
                            <UserCircle className="w-24 h-24 text-indigo-500" />
                        )}
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition-colors shadow-md"
                            aria-label="Change profile picture"
                        >
                            <UploadCloud className="w-4 h-4" />
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange}
                            className="hidden" 
                            accept="image/*"
                        />
                    </div>

                    {newPicture && (
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-500">Selected: {newPicture.name}</p>
                            <button onClick={handlePictureUpload} disabled={uploading} className="mt-2 text-sm text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-700 disabled:opacity-50">
                                {uploading ? 'Uploading...' : 'Confirm Upload'}
                            </button>
                        </div>
                    )}

                    <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                    <p className="mt-1 text-md text-gray-500 dark:text-gray-400">{profile.email}</p>
                    <span className="mt-2 px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 dark:bg-green-700 dark:text-green-100 rounded-full">{profile.role}</span>
                </div>

                {profile.role === 'Learner' && (
                     <div className="mt-8 grid grid-cols-2 gap-6 text-center">
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                            <CheckCircle className="w-8 h-8 mx-auto text-indigo-500" />
                            <p className="mt-2 text-2xl font-bold">{profile.courses_completed?.length || 0}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Courses Completed</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                            <BookOpen className="w-8 h-8 mx-auto text-indigo-500" />
                            <p className="mt-2 text-2xl font-bold">{profile.points || 0}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Points</p>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <button 
                        onClick={onLogout} 
                        className="w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <LogOutIcon className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

