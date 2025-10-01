import { HomeIcon, BookOpen, User, PlusCircleIcon, LogOutIcon } from './Icons';

// NavLink component ab label ko choti screen par chhipa dega
const NavLink = ({ icon: Icon, label, onClick, isActive }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center flex-grow text-sm font-medium transition-colors duration-200 
                   md:flex-row md:justify-start md:space-x-3 md:px-4 md:py-3 md:rounded-lg 
                   ${isActive
                        ? 'text-indigo-400 md:bg-indigo-600 md:text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
    >
        <Icon className="w-6 h-6 mb-1 md:mb-0" />
        {/* Label ko badi screen par hi dikhayenge */}
        <span className="hidden md:inline">{label}</span>
    </button>
);

export default function Navbar({ user, onNavigate, onLogout, currentPage }) {
    return (
        // Main container jo mobile par bottom bar aur desktop par sidebar ban jaata hai
        <aside className="fixed bottom-0 inset-x-0 h-16 bg-gray-800 text-white z-50
                          md:fixed md:inset-y-0 md:left-0 md:w-64 md:h-screen md:flex md:flex-col md:p-4">
            
            {/* Logo, jo sirf badi screen par dikhega */}
            <div className="hidden md:flex text-2xl font-bold mb-10 px-2 items-center space-x-2">
                <BookOpen className="w-8 h-8 text-indigo-400" />
                <span>Learnify</span>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-row h-full w-full md:flex-col md:flex-grow md:space-y-2">
                <NavLink icon={HomeIcon} label="Dashboard" onClick={() => onNavigate('dashboard')} isActive={currentPage === 'dashboard'} />
                <NavLink icon={BookOpen} label="Courses" onClick={() => onNavigate('courses')} isActive={currentPage === 'courses'} />
                {user.role === 'Mentor' && (
                    <NavLink icon={PlusCircleIcon} label="Create Course" onClick={() => onNavigate('createCourse')} isActive={currentPage === 'createCourse'} />
                )}
                <NavLink icon={User} label="Profile" onClick={() => onNavigate('profile')} isActive={currentPage === 'profile'} />
                
                {/* Logout button (mobile par alag se dikhega) */}
                <div className="md:hidden flex-grow flex flex-col items-center justify-center">
                    <button onClick={onLogout} className="text-gray-400 hover:text-white">
                        <LogOutIcon className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Logout button (desktop par alag se dikhega) */}
            <div className="hidden md:block mt-auto">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                    <LogOutIcon className="w-6 h-6" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

