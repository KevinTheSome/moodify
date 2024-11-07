import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white min-h-screen flex flex-col items-center">
                {/* Hero Section */}
                <div className="text-center mt-16">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-pink-500 animate-pulse">
                        Discover Your Sound
                    </h1>
                    <p className="mt-4 text-lg md:text-2xl text-gray-300">
                        Get personalized music suggestions that match your vibe.
                    </p>
                    <button className="mt-8 px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                       <a href="/dashboard">Start Listening</a> 
                    </button>
                </div>

                {/* Music Discovery Section */}
                <section className="mt-20 w-full max-w-5xl px-6">
                    <h2 className="text-3xl font-bold text-white mb-8">
                        Top Picks for You
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Sample Album Cover */}
                        <div className="relative">
                            <img
                                src="album-cover.jpg"
                                alt="Album Cover"
                                className="rounded-lg shadow-lg hover:shadow-pink-600/50 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 flex items-center justify-center transition duration-300">
                                <button className="text-pink-500 font-bold text-xl">
                                    Play
                                </button>
                            </div>
                        </div>
                        {/* Repeat album covers here */}
                    </div>
                </section>

                {/* Featured Genres Section */}
                <section className="mt-16 w-full max-w-5xl px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">
                        Explore Genres
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <span className="px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white cursor-pointer transition duration-300">
                            Pop
                        </span>
                        <span className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white cursor-pointer transition duration-300">
                            Jazz
                        </span>
                        {/* Add more genres here */}
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-16 text-center text-gray-400">
                    <div className="flex gap-4 justify-center mb-4">
                        <a href="#" className="hover:text-pink-500">
                            About
                        </a>
                        <a href="#" className="hover:text-pink-500">
                            Contact
                        </a>
                        <a href="#" className="hover:text-pink-500">
                            Terms of Service
                        </a>
                    </div>
                    <p>© 2024 Moodify. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
