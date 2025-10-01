import { useState } from 'react';
import * as api from '../api'; // API functions ko import karein

const InputField = ({id, type, placeholder, value, onChange}) => (
    <div>
        <label htmlFor={id} className="sr-only">{placeholder}</label>
        <input 
            id={id} 
            name={id} 
            type={type} 
            required 
            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);

// onLogin prop ab seedhe user data lega
export default function LoginPage({ onLogin }) {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Learner');

    // Loading aur error states add karein
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let data;
            if (isLoginView) {
                // Seedhe API ko call karein
                const response = await api.login({ email, password });
                data = response.data;
            } else {
                // Seedhe API ko call karein
                const response = await api.register({ name, email, password, role });
                data = response.data;
            }
            onLogin(data); // API se mile data ko App component ko bhejein
        } catch (err) {
            // Backend se aaye error ko display karein
            setError(err.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        {isLoginView ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {isLoginView ? 'Or ' : ''}
                        <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                            {isLoginView ? 'create a new account' : 'sign in instead'}
                        </button>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {!isLoginView && (
                        <>
                            <InputField id="name" type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">I am a...</label>
                                <div className="mt-2 flex rounded-md shadow-sm">
                                    <button type="button" onClick={() => setRole('Learner')} className={`flex-1 px-4 py-2 text-sm font-medium ${role === 'Learner' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} rounded-l-md hover:bg-indigo-500`}>Learner</button>
                                    <button type="button" onClick={() => setRole('Mentor')} className={`flex-1 px-4 py-2 text-sm font-medium ${role === 'Mentor' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} rounded-r-md hover:bg-indigo-500`}>Mentor</button>
                                </div>
                            </div>
                        </>
                    )}
                    <InputField id="email" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                    <InputField id="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Processing...' : (isLoginView ? 'Sign in' : 'Register')}
                    </button>
                </form>
            </div>
        </div>
    );
}

