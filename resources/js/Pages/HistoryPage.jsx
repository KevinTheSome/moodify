import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the listening history from the API
        fetch('/listening-history')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch history');
                return response.json();
            })
            .then(data => {
                setHistory(data);
                setLoading(false);
                console.log(data);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <AuthenticatedLayout>
 <div style={{ backgroundColor: '#6E257D' }} className="min-h-screen p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Listening History</h1>

            {/* Loading and error states */}
            {loading ? (
                <p className="text-gray-400" aria-live="polite">
                    Loading listening history...
                </p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <ul className="space-y-4">
                    {history.length > 0 ? (
                        history.map(entry => {
                            const playlists = JSON.parse(entry.music_playlists);
                            return (
                                <li key={entry.id} className="p-4 bg-gray-800 rounded-lg transition hover:bg-[#2D2D2D]">
                                    <h2 className="text-xl font-semibold mb-2">User: {entry.name}</h2>
                                    <p className="text-gray-400 mb-4">
                                        Last listened: {new Date(entry.listened_at).toLocaleString()}
                                    </p>
                                    

                                    <h3 className="text-lg font-semibold">Playlists:</h3>
                                    <ul className="ml-4 list-disc">
                                        {playlists.map(playlist => (
                                            <li key={playlist.id} className="mb-2">
                                                <a
                                                    href={playlist.external_urls.spotify}
                                                    target="_blank"
 rel="noopener noreferrer"
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    {playlist.name}
                                                </a>
                                                <p className="text-gray-400 text-sm">Owner: {playlist.owner.display_name}</p>
                                                <img
                                                    src={playlist.images[0]?.url || ''}
                                                    alt={playlist.name}
                                                    className="w-24 h-24 mt-2 rounded"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        })
                    ) : (
                        <p className="text-gray-400">No recent listening history available.</p>
                    )}
                </ul>
            )}
        </div>
        </AuthenticatedLayout>
    );
};

export default HistoryPage;
