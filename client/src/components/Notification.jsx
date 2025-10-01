import React from 'react';

export default function Notification({ message, type }) {
    const baseClasses = "fixed bottom-5 right-5 md:bottom-auto md:top-5 md:right-5 p-4 rounded-lg shadow-lg text-white text-sm font-medium z-50 animate-slide-in-right";
    const typeClasses = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500"
    };
    return (
        <div className={`${baseClasses} ${typeClasses[type] || 'bg-gray-800'}`}>
            {message}
        </div>
    );
}